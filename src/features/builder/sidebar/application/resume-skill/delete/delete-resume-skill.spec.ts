import { DeleteResumeSkillDto } from './delete-resume-skill.dto';
import { DeleteResumeSkillPort } from './delete-resume-skill.port';
import { DeleteResumeSkillUsecase } from './delete-resume-skill.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockDeleteResumeSkillRepository implements DeleteResumeSkillPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(skillId: string): Promise<void> {}
}

describe('delete resume skill usecase', () => {
	let usecase: DeleteResumeSkillUsecase;
	let spydelete: MockInstance;

	beforeEach(() => {
		const repo = new MockDeleteResumeSkillRepository();
		usecase = new DeleteResumeSkillUsecase(repo);
		spydelete = vi.spyOn(repo, 'delete');
	});

	const input: DeleteResumeSkillDto = {
		skillId: 'skillId',
	};

	it('Should return successful message', async () => {
		spydelete.mockImplementationOnce(() => Promise.resolve());

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Skill deleted successfully');
	});

	it('Should return error if delete method fails', async () => {
		spydelete.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Error removing resume skill');
	});
});
