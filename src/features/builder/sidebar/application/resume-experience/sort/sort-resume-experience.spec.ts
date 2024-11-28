import { SortResumeExperiencePayload } from '../../../shared/types';
import { SortResumeExperienceDto } from './sort-resume-experience.dto';
import { SortResumeExperiencePort } from './sort-resume-experience.port';
import { SortResumeExperienceUseCase } from './sort-resume-experience.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockSortResumeExperienceRepository implements SortResumeExperiencePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async sort(payload: SortResumeExperiencePayload): Promise<void> {
		return;
	}
}

describe('Sort Resume Experience Use Case', () => {
	let usecase: SortResumeExperienceUseCase;
	let spySort: MockInstance;

	const input: SortResumeExperienceDto = [
		{ experienceId: '1', sortOrder: 1 },
		{ experienceId: '2', sortOrder: 2 },
	];

	beforeEach(() => {
		const repo = new MockSortResumeExperienceRepository();
		usecase = new SortResumeExperienceUseCase(repo);
		spySort = vi.spyOn(repo, 'sort');
	});

	it('Should return success response', async () => {
		spySort.mockImplementationOnce(() => Promise.resolve());
		const response = await usecase.execute(input);

		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Sort Resume Experience has been successfully');
	});

	it('Should return error response', async () => {
		spySort.mockImplementationOnce(() => Promise.reject());
		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Sort Resume Experience has failed');
	});

	it('Should return error response if input is invalid', async () => {
		spySort.mockImplementationOnce(() => Promise.resolve());

		const notValidInput = [
			{ id: '1', sortOrder: 1 },
			{ id: '2', sortOrder: 2 },
		] as unknown as SortResumeExperienceDto;

		const response = await usecase.execute(notValidInput);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toContain('Invalid');
	});
});
