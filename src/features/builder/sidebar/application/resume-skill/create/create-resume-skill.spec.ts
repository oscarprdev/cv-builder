import { CreateResumeSkillDto } from './create-resume-skill.dto';
import { CreateResumeSkillPort } from './create-resume-skill.port';
import { CreateResumeSkillUsecase } from './create-resume-skill.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockCreateResumeSkillPort implements CreateResumeSkillPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async create(input: CreateResumeSkillDto): Promise<void> {}
}

describe('Create resume skill usecase', () => {
	let usecase: CreateResumeSkillUsecase;
	let spyCreate: MockInstance;

	const input: CreateResumeSkillDto = {
		resumeId: 'resumeId',
		name: 'css',
		level: 5,
	};

	beforeEach(() => {
		const repository = new MockCreateResumeSkillPort();
		usecase = new CreateResumeSkillUsecase(repository);
		spyCreate = vi.spyOn(repository, 'create');
	});

	it('Should create new resume skill', async () => {
		spyCreate.mockImplementationOnce(() => Promise.resolve());

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(isError(response)).toBeFalsy();
		expect(response).toHaveProperty('success');
		expect(response.success).toEqual('Resume skill created successfully');
	});

	it('Should return error message if resume skill request fails', async () => {
		spyCreate.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBeTruthy();
		expect(response).toHaveProperty('error');
		expect(response.error).toEqual('Error creating resume skill');
	});
});
