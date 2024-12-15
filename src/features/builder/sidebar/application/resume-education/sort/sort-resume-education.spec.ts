import { SortResumeEducationPayload } from '../../../shared/types';
import { SortResumeEducationDto } from './sort-resume-education.dto';
import { SortResumeEducationPort } from './sort-resume-education.port';
import { SortResumeEducationUseCase } from './sort-resume-education.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockSortResumeEducationRepository implements SortResumeEducationPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async sort(payload: SortResumeEducationPayload): Promise<void> {
		return;
	}
}

describe('Sort Resume Education Use Case', () => {
	let usecase: SortResumeEducationUseCase;
	let spySort: MockInstance;

	const input: SortResumeEducationDto = [
		{ educationId: '1', sortOrder: 1 },
		{ educationId: '2', sortOrder: 2 },
	];

	beforeEach(() => {
		const repo = new MockSortResumeEducationRepository();
		usecase = new SortResumeEducationUseCase(repo);
		spySort = vi.spyOn(repo, 'sort');
	});

	it('Should return success response', async () => {
		spySort.mockImplementationOnce(() => Promise.resolve());
		const response = await usecase.execute(input);

		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Sort Resume Education has been successfully');
	});

	it('Should return error response', async () => {
		spySort.mockImplementationOnce(() => Promise.reject());
		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Sort Resume Education has failed');
	});

	it('Should return error response if input is invalid', async () => {
		spySort.mockImplementationOnce(() => Promise.resolve());

		const notValidInput = [
			{ id: '1', sortOrder: 1 },
			{ id: '2', sortOrder: 2 },
		] as unknown as SortResumeEducationDto;

		const response = await usecase.execute(notValidInput);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toContain('Invalid');
	});
});
