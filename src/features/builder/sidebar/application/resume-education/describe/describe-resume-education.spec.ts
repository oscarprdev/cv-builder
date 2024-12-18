import {
	DescribeResumeEducationDto,
	DescribeResumeEducationResponseDto,
} from './describe-resume-education.dto';
import { DescribeResumeEducationPort } from './describe-resume-education.port';
import { DescribeResumeEducationUsecase } from './describe-resume-education.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { ResumeEducationInfoModel } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

class MockDescribeResumeEducationRepository implements DescribeResumeEducationPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async describe(input: { resumeId: string }): Promise<DescribeResumeEducationResponseDto> {
		return {
			educationInfo: [
				{
					id: '1',
					resumeId: 'resumeId',
					institution: 'Oxford',
					study: 'Software Engineering',
					startDate: '2022-01-01',
					endDate: '2022-12-31',
					description: 'Software Engineering at Oxford',
					sortOrder: 1,
				},
			],
			sectionTitle: 'Education',
		};
	}
}

describe('Describe resume educationusecase', () => {
	let usecase: DescribeResumeEducationUsecase;
	let describeSpy: MockInstance;

	beforeEach(() => {
		const repo = new MockDescribeResumeEducationRepository();
		usecase = new DescribeResumeEducationUsecase(repo);
		describeSpy = vi.spyOn(repo, 'describe');
	});

	it('Should return the proper resume education info', async () => {
		const resumeEducation: ResumeEducationInfoModel[] = [
			{
				id: '1',
				resumeId: 'resumeId',
				institution: 'Oxford',
				study: 'Software Engineering',
				startDate: '2022-01-01',
				endDate: '2022-12-31',
				description: 'Software Engineering at Oxford',
				sortOrder: 1,
			},
		];

		describeSpy.mockImplementationOnce(() => Promise.resolve(resumeEducation));
		const input: DescribeResumeEducationDto = {
			resumeId: 'resumeId',
		};
		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response.success).toEqual(resumeEducation);
	});

	it('Should return an error if describe method fails', async () => {
		const input: DescribeResumeEducationDto = {
			resumeId: 'resumeId',
		};

		describeSpy.mockImplementationOnce(() => Promise.reject('Error describing resume'));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Error describing resume');
	});

	it('should return error if resume not found', async () => {
		const input: DescribeResumeEducationDto = {
			resumeId: 'resumeId',
		};

		describeSpy.mockImplementationOnce(() => Promise.resolve(null));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe(
			'Invalid output: Education Info and sectionTitle fields are required'
		);
	});
});
