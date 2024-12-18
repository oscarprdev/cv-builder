import { DeleteResumeDto } from './delete-resume.dto';
import { DeleteResumePorts } from './delete-resume.ports';
import { DeleteResumeUsecase } from './delete-resume.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockDeleteResumeRepository implements DeleteResumePorts {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async deleteResume(resumeId: string): Promise<void> {}
}

describe('delete resume usecase', () => {
	let usecase: DeleteResumeUsecase;
	let spydelete: MockInstance;

	beforeEach(() => {
		const repo = new MockDeleteResumeRepository();
		usecase = new DeleteResumeUsecase(repo);
		spydelete = vi.spyOn(repo, 'deleteResume');
	});

	const input: DeleteResumeDto = {
		resumeId: 'resumeId',
	};

	it('Should return successful message', async () => {
		spydelete.mockImplementationOnce(() => Promise.resolve());

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Resume deleted successfully');
	});

	it('Should return error if delete method fails', async () => {
		spydelete.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Error deleting resume');
	});
});
