import { DeleteResumeExperienceDto } from './delete-resume-experience.dto';
import { DeleteResumeExperiencePort } from './delete-resume-experience.port';
import { DeleteResumeExperienceUsecase } from './delete-resume-experience.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockDeleteResumeExperienceRepository implements DeleteResumeExperiencePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(experienceId: string): Promise<void> {}
}

describe('delete resume experience usecase', () => {
	let usecase: DeleteResumeExperienceUsecase;
	let spydelete: MockInstance;

	beforeEach(() => {
		const repo = new MockDeleteResumeExperienceRepository();
		usecase = new DeleteResumeExperienceUsecase(repo);
		spydelete = vi.spyOn(repo, 'delete');
	});

	const input: DeleteResumeExperienceDto = {
		experienceId: 'experienceId',
	};

	it('Should return successful message', async () => {
		spydelete.mockImplementationOnce(() => Promise.resolve());

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Experience deleted successfully');
	});

	it('Should return error if delete method fails', async () => {
		spydelete.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Error removing resume experience');
	});
});
