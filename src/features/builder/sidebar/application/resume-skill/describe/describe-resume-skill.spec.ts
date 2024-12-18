import {
	DescribeResumeSkillDto,
	DescribeResumeSkillResponseDto,
} from './describe-resume-skill.dto';
import { DescribeResumeSkillPort } from './describe-resume-skill.port';
import { DescribeResumeSkillUsecase } from './describe-resume-skill.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { ResumeSkillInfoModel } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

class MockDescribeResumeSkillRepository implements DescribeResumeSkillPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async describe(input: { resumeId: string }): Promise<DescribeResumeSkillResponseDto> {
		return {
			skillInfo: [
				{
					id: '1',
					resumeId: 'resumeId',
					name: 'Google',
					level: 5,
					sortOrder: 1,
				},
			],
			sectionTitle: 'Skills',
		};
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
				id: 'a3a99d81-889d-47d2-8057-8f07ad3d932c',
				resumeId: 'ace5a9e3-18c1-4037-a594-39012e9b7371',
				name: 'Javascript',
				level: 4,
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
		expect(response.error).toBe(
			'Invalid output: Skill Info and sectionTitle fields are required'
		);
	});
});
