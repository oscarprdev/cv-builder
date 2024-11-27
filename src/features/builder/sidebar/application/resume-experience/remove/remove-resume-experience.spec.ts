import { RemoveResumeExperienceDto } from './remove-resume-experience.dto';
import { RemoveResumeExperiencePort } from './remove-resume-experience.port';
import { RemoveResumeExperienceUsecase } from './remove-resume-experience.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockRemoveResumeExperienceRepository implements RemoveResumeExperiencePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async remove(experienceId: string): Promise<void> {}
}

describe('Remove resume experience usecase', () => {
	let usecase: RemoveResumeExperienceUsecase;
	let spyRemove: MockInstance;

	beforeEach(() => {
		const repo = new MockRemoveResumeExperienceRepository();
		usecase = new RemoveResumeExperienceUsecase(repo);
		spyRemove = vi.spyOn(repo, 'remove');
	});

	const input: RemoveResumeExperienceDto = {
		experienceId: 'experienceId',
	};

	it('Should return successful message', async () => {
		spyRemove.mockImplementationOnce(() => Promise.resolve());

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Experience removed successfully');
	});

	it('Should return error if remove method fails', async () => {
		spyRemove.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Error removing resume experience');
	});
});
