import { SortResumeLanguagePayload } from '../../../shared/types';
import { SortResumeLanguageDto } from './sort-resume-language.dto';
import { SortResumeLanguagePort } from './sort-resume-language.port';
import { SortResumeLanguageUseCase } from './sort-resume-language.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockSortResumeLanguageRepository implements SortResumeLanguagePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async sort(payload: SortResumeLanguagePayload): Promise<void> {
		return;
	}
}

describe('Sort Resume Language Use Case', () => {
	let usecase: SortResumeLanguageUseCase;
	let spySort: MockInstance;

	const input: SortResumeLanguageDto = [
		{ languageId: '1', sortOrder: 1 },
		{ languageId: '2', sortOrder: 2 },
	];

	beforeEach(() => {
		const repo = new MockSortResumeLanguageRepository();
		usecase = new SortResumeLanguageUseCase(repo);
		spySort = vi.spyOn(repo, 'sort');
	});

	it('Should return success response', async () => {
		spySort.mockImplementationOnce(() => Promise.resolve());
		const response = await usecase.execute(input);

		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Sort Resume Language has been successfully');
	});

	it('Should return error response', async () => {
		spySort.mockImplementationOnce(() => Promise.reject());
		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Sort Resume Language has failed');
	});

	it('Should return error response if input is invalid', async () => {
		spySort.mockImplementationOnce(() => Promise.resolve());

		const notValidInput = [
			{ id: '1', sortOrder: 1 },
			{ id: '2', sortOrder: 2 },
		] as unknown as SortResumeLanguageDto;

		const response = await usecase.execute(notValidInput);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toContain('Invalid');
	});
});
