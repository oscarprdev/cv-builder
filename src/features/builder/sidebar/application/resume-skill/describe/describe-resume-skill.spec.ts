import { DescribeResumeSkillDto } from './describe-resume-skill.dto';
import { DescribeResumeSkillPort } from './describe-resume-skill.port';
import { DescribeResumeSkillUsecase } from './describe-resume-skill.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { ResumeSkillInfoModel } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

class MockDescribeResumeSkillRepository implements DescribeResumeSkillPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async describe(input: { resumeId: string }): Promise<ResumeSkillInfoModel[]> {
		return [];
	}
}

describe('Describe resume skillusecase', () => {
	let usecase: DescribeResumeSkillUsecase;
	let describeSpy: MockInstance;

	beforeEach(() => {
		const repo = new MockDescribeResumeSkillRepository();
		usecase = new DescribeResumeSkillUsecase(repo);
		describeSpy = vi.spyOn(repo, 'describe');
	});

	it('Should return the proper resume skill info', async () => {
		const resumeSkill: ResumeSkillInfoModel[] = [
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

		describeSpy.mockImplementationOnce(() => Promise.resolve(resumeSkill));
		const input: DescribeResumeSkillDto = {
			resumeId: 'resumeId',
		};
		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response.success).toEqual(resumeSkill);
	});

	it('Should return an error if describe method fails', async () => {
		const input: DescribeResumeSkillDto = {
			resumeId: 'resumeId',
		};

		describeSpy.mockImplementationOnce(() => Promise.reject('Error describing resume'));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Error describing resume');
	});

	it('should return error if resume not found', async () => {
		const input: DescribeResumeSkillDto = {
			resumeId: 'resumeId',
		};

		describeSpy.mockImplementationOnce(() => Promise.resolve(null));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Resume Skill Info not found');
	});
});
