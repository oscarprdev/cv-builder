import { DeleteResumeLanguageDto } from './delete-resume-language.dto';
import { DeleteResumeLanguagePort } from './delete-resume-language.port';
import { DeleteResumeLanguageUsecase } from './delete-resume-language.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockDeleteResumeLanguageRepository implements DeleteResumeLanguagePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(languageId: string): Promise<void> {}
}

describe('delete resume language usecase', () => {
	let usecase: DeleteResumeLanguageUsecase;
	let spydelete: MockInstance;

	beforeEach(() => {
		const repo = new MockDeleteResumeLanguageRepository();
		usecase = new DeleteResumeLanguageUsecase(repo);
		spydelete = vi.spyOn(repo, 'delete');
	});

	const input: DeleteResumeLanguageDto = {
		languageId: 'languageId',
	};

	it('Should return successful message', async () => {
		spydelete.mockImplementationOnce(() => Promise.resolve());

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Language deleted successfully');
	});

	it('Should return error if delete method fails', async () => {
		spydelete.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Error removing resume language');
	});
});
