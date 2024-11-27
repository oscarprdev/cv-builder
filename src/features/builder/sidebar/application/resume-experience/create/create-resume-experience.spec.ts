import { CreateResumeExperienceDto } from './create-resume-experience.dto';
import { CreateResumeExperiencePort } from './create-resume-experience.port';
import { CreateResumeExperienceUsecase } from './create-resume-experience.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockCreateResumeExperiencePort implements CreateResumeExperiencePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async create(input: CreateResumeExperienceDto): Promise<void> {}
}

describe('Create resume experience usecase', () => {
	let usecase: CreateResumeExperienceUsecase;
	let spyCreate: MockInstance;

	const input: CreateResumeExperienceDto = {
		resumeId: 'resumeId',
		company: 'company',
		role: 'role',
		description: 'description',
		startDate: 'startDate',
		endDate: 'endDate',
		website: 'website',
	};

	beforeEach(() => {
		const repository = new MockCreateResumeExperiencePort();
		usecase = new CreateResumeExperienceUsecase(repository);
		spyCreate = vi.spyOn(repository, 'create');
	});

	it('Should create new resume experience', async () => {
		spyCreate.mockImplementationOnce(() => Promise.resolve());

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(isError(response)).toBeFalsy();
		expect(response).toHaveProperty('success');
		expect(response.success).toEqual('Resume experience created successfully');
	});

	it('Should return error message if resume experience request fails', async () => {
		spyCreate.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBeTruthy();
		expect(response).toHaveProperty('error');
		expect(response.error).toEqual('Error creating resume experience');
	});
});
