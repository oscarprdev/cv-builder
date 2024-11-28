import { CreateResumeEducationDto } from './create-resume-education.dto';
import { CreateResumeEducationPort } from './create-resume-education.port';
import { CreateResumeEducationUsecase } from './create-resume-education.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockCreateResumeEducationPort implements CreateResumeEducationPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async create(input: CreateResumeEducationDto): Promise<void> {}
}

describe('Create resume education usecase', () => {
	let usecase: CreateResumeEducationUsecase;
	let spyCreate: MockInstance;

	const input: CreateResumeEducationDto = {
		resumeId: 'resumeId',
		institution: 'company',
		study: 'role',
		description: 'description',
		startDate: 'startDate',
		endDate: 'endDate',
	};

	beforeEach(() => {
		const repository = new MockCreateResumeEducationPort();
		usecase = new CreateResumeEducationUsecase(repository);
		spyCreate = vi.spyOn(repository, 'create');
	});

	it('Should create new resume education', async () => {
		spyCreate.mockImplementationOnce(() => Promise.resolve());

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(isError(response)).toBeFalsy();
		expect(response).toHaveProperty('success');
		expect(response.success).toEqual('Resume education created successfully');
	});

	it('Should return error message if resume education request fails', async () => {
		spyCreate.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBeTruthy();
		expect(response).toHaveProperty('error');
		expect(response.error).toEqual('Error creating resume education');
	});
});
