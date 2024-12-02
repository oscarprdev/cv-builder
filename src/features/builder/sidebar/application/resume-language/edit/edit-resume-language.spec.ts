import { EditResumeLanguagePayload } from '../../../shared/types';
import { EditResumeLanguageDto } from './edit-resume-language.dto';
import { EditResumeLanguagePort } from './edit-resume-language.port';
import { EditResumeLanguageUsecase } from './edit-resume-language.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { Enums } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

class MockEditResumeLanguageRepository implements EditResumeLanguagePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async edit(payload: EditResumeLanguagePayload): Promise<void> {
		return;
	}
}

describe('Edit Resume Language usecase', () => {
	let usecase: EditResumeLanguageUsecase;
	let spyEdit: MockInstance;

	const input: EditResumeLanguageDto = {
		id: '1',
		language: 'English',
		level: Enums.languageLevel.ADVANCED,
		certificationUrl: 'https://cambridge.com',
	};

	beforeEach(() => {
		const repository = new MockEditResumeLanguageRepository();
		usecase = new EditResumeLanguageUsecase(repository);
		spyEdit = vi.spyOn(repository, 'edit');
	});

	it('Should return success response', async () => {
		spyEdit.mockImplementationOnce(() => Promise.resolve());
		const response = await usecase.execute(input);

		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Edit resume language success');
	});

	it('Should return error response', async () => {
		spyEdit.mockImplementationOnce(() => Promise.reject());
		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Edit resume language failed');
	});

	it('Should return error response if the input is not valid', async () => {
		spyEdit.mockImplementationOnce(() => Promise.reject());
		const notValidInput = { invalidId: '' } as unknown as EditResumeLanguageDto;
		const response = await usecase.execute(notValidInput);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBeTruthy();
	});
});
