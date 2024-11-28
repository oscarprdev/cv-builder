import { DescribeResumeExperienceDto } from './describe-resume-experience.dto';
import { DescribeResumeExperiencePort } from './describe-resume-experience.port';
import { DescribeResumeExperienceUsecase } from './describe-resume-experience.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { ResumeExperienceInfoModel } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

class MockDescribeResumeExperienceRepository implements DescribeResumeExperiencePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async describe(input: { resumeId: string }): Promise<ResumeExperienceInfoModel[]> {
		return [];
	}
}

describe('Describe resume experienceusecase', () => {
	let usecase: DescribeResumeExperienceUsecase;
	let describeSpy: MockInstance;

	beforeEach(() => {
		const repo = new MockDescribeResumeExperienceRepository();
		usecase = new DescribeResumeExperienceUsecase(repo);
		describeSpy = vi.spyOn(repo, 'describe');
	});

	it('Should return the proper resume experience info', async () => {
		const resumeExperience: ResumeExperienceInfoModel[] = [
			{
				id: '1',
				resumeId: 'resumeId',
				company: 'Google',
				role: 'Software Engineer',
				website: 'https://google.com',
				startDate: '2022-01-01',
				endDate: '2022-12-31',
				description: 'Software Engineer at Google',
				sortOrder: 1,
			},
		];

		describeSpy.mockImplementationOnce(() => Promise.resolve(resumeExperience));
		const input: DescribeResumeExperienceDto = {
			resumeId: 'resumeId',
		};
		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response.success).toEqual(resumeExperience);
	});

	it('Should return an error if describe method fails', async () => {
		const input: DescribeResumeExperienceDto = {
			resumeId: 'resumeId',
		};

		describeSpy.mockImplementationOnce(() => Promise.reject('Error describing resume'));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Error describing resume');
	});

	it('should return error if resume not found', async () => {
		const input: DescribeResumeExperienceDto = {
			resumeId: 'resumeId',
		};

		describeSpy.mockImplementationOnce(() => Promise.resolve(null));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Resume Experience Info not found');
	});
});
