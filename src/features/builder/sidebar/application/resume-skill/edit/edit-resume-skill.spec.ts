import { EditResumeSkillPayload } from '../../../shared/types';
import { EditResumeSkillDto } from './edit-resume-skill.dto';
import { EditResumeSkillPort } from './edit-resume-skill.port';
import { EditResumeSkillUsecase } from './edit-resume-skill.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockEditResumeSkillRepository implements EditResumeSkillPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async edit(payload: EditResumeSkillPayload): Promise<void> {
		return;
	}
}

describe('Edit Resume Skill usecase', () => {
	let usecase: EditResumeSkillUsecase;
	let spyEdit: MockInstance;

	const input: EditResumeSkillDto = {
		id: '1',
		name: 'Css',
		level: 5,
	};

	beforeEach(() => {
		const repository = new MockEditResumeSkillRepository();
		usecase = new EditResumeSkillUsecase(repository);
		spyEdit = vi.spyOn(repository, 'edit');
	});

	it('Should return success response', async () => {
		spyEdit.mockImplementationOnce(() => Promise.resolve());
		const response = await usecase.execute(input);

		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Edit resume skill success');
	});

	it('Should return error response', async () => {
		spyEdit.mockImplementationOnce(() => Promise.reject());
		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Edit resume skill failed');
	});

	it('Should return error response if the input is not valid', async () => {
		spyEdit.mockImplementationOnce(() => Promise.reject());
		const notValidInput = { invalidId: '' } as unknown as EditResumeSkillDto;
		const response = await usecase.execute(notValidInput);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBeTruthy();
	});
});
