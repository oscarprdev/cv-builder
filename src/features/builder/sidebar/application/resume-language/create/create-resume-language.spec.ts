import { CreateResumeLanguageDto } from './create-resume-language.dto';
import { CreateResumeLanguagePort } from './create-resume-language.port';
import { CreateResumeLanguageUsecase } from './create-resume-language.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { Enums } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

class MockCreateResumeLanguagePort implements CreateResumeLanguagePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async create(input: CreateResumeLanguageDto): Promise<void> {}
}

describe('Create resume language usecase', () => {
	let usecase: CreateResumeLanguageUsecase;
	let spyCreate: MockInstance;

	const input: CreateResumeLanguageDto = {
		resumeId: 'resumeId',
		language: 'English',
		level: Enums.languageLevel.ADVANCED,
		certificationUrl: 'https://cambridge.com',
	};

	beforeEach(() => {
		const repository = new MockCreateResumeLanguagePort();
		usecase = new CreateResumeLanguageUsecase(repository);
		spyCreate = vi.spyOn(repository, 'create');
	});

	it('Should create new resume language', async () => {
		spyCreate.mockImplementationOnce(() => Promise.resolve());

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(isError(response)).toBeFalsy();
		expect(response).toHaveProperty('success');
		expect(response.success).toEqual('Resume language created successfully');
	});

	it('Should return error message if resume language request fails', async () => {
		spyCreate.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBeTruthy();
		expect(response).toHaveProperty('error');
		expect(response.error).toEqual('Error creating resume language');
	});

	it('Should return error message if certificate url input is not valid', async () => {
		spyCreate.mockImplementationOnce(() => Promise.reject());

		const invalidInput = {
			...input,
			certificateUrl: 'not-valid-url',
		} as unknown as CreateResumeLanguageDto;

		const response = await usecase.execute(invalidInput);

		if (!isError(response)) return;

		expect(isError(response)).toBeTruthy();
		expect(response).toHaveProperty('error');
		expect(response.error).toEqual('Invalid input: Invalid URL format - http://*****.com');
	});
});
