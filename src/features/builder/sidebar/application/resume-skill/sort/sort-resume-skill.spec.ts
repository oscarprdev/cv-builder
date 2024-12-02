import { SortResumeSkillPayload } from '../../../shared/types';
import { SortResumeSkillDto } from './sort-resume-skill.dto';
import { SortResumeSkillPort } from './sort-resume-skill.port';
import { SortResumeSkillUseCase } from './sort-resume-skill.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockSortResumeSkillRepository implements SortResumeSkillPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async sort(payload: SortResumeSkillPayload): Promise<void> {
		return;
	}
}

describe('Sort Resume Skill Use Case', () => {
	let usecase: SortResumeSkillUseCase;
	let spySort: MockInstance;

	const input: SortResumeSkillDto = [
		{ skillId: '1', sortOrder: 1 },
		{ skillId: '2', sortOrder: 2 },
	];

	beforeEach(() => {
		const repo = new MockSortResumeSkillRepository();
		usecase = new SortResumeSkillUseCase(repo);
		spySort = vi.spyOn(repo, 'sort');
	});

	it('Should return success response', async () => {
		spySort.mockImplementationOnce(() => Promise.resolve());
		const response = await usecase.execute(input);

		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Sort Resume Skill has been successfully');
	});

	it('Should return error response', async () => {
		spySort.mockImplementationOnce(() => Promise.reject());
		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Sort Resume Skill has failed');
	});

	it('Should return error response if input is invalid', async () => {
		spySort.mockImplementationOnce(() => Promise.resolve());

		const notValidInput = [
			{ id: '1', sortOrder: 1 },
			{ id: '2', sortOrder: 2 },
		] as unknown as SortResumeSkillDto;

		const response = await usecase.execute(notValidInput);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toContain('Invalid');
	});
});
