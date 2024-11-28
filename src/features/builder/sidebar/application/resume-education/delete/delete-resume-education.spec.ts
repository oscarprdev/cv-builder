import { DeleteResumeEducationDto } from './delete-resume-education.dto';
import { DeleteResumeEducationPort } from './delete-resume-education.port';
import { DeleteResumeEducationUsecase } from './delete-resume-education.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockDeleteResumeEducationRepository implements DeleteResumeEducationPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(educationId: string): Promise<void> {}
}

describe('Delete resume education usecase', () => {
	let usecase: DeleteResumeEducationUsecase;
	let spyDelete: MockInstance;

	beforeEach(() => {
		const repo = new MockDeleteResumeEducationRepository();
		usecase = new DeleteResumeEducationUsecase(repo);
		spyDelete = vi.spyOn(repo, 'delete');
	});

	const input: DeleteResumeEducationDto = {
		educationId: 'educationId',
	};

	it('Should return successful message', async () => {
		spyDelete.mockImplementationOnce(() => Promise.resolve());

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Education deleted successfully');
	});

	it('Should return error if delete method fails', async () => {
		spyDelete.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Error deletting resume education');
	});
});
