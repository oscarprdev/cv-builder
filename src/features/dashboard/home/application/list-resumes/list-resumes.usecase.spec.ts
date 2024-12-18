import { ListResumesPort } from './list-resumes.port';
import { ListResumesUseCase } from './list-resumes.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { ListResumesInput } from '~/features/dashboard/home/shared/types';
import { isError } from '~/lib/utils/either';

class MockListResumesRepository implements ListResumesPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async listResumes(_: ListResumesInput) {
		return [];
	}
}

describe('List Resumes UseCase', () => {
	let usecase: ListResumesUseCase;
	let spyListResumes: MockInstance;

	beforeEach(() => {
		const repository = new MockListResumesRepository();
		usecase = new ListResumesUseCase(repository);
		spyListResumes = vi.spyOn(repository, 'listResumes');
	});

	it('Should respond with resumes', async () => {
		spyListResumes.mockImplementationOnce(() => Promise.resolve([]));

		const input: ListResumesInput = {
			userId: '123',
		};

		const result = await usecase.execute(input);

		if (isError(result)) return;

		expect(result.success).toEqual([]);
	});

	it('Should respond with error message', async () => {
		spyListResumes.mockImplementationOnce(() => Promise.reject());

		const input: ListResumesInput = {
			userId: '123',
		};

		const result = await usecase.execute(input);

		expect(isError(result)).toBe(true);

		if (!isError(result)) return;

		expect(result.error).toBe('Error listing resumes');
	});
});
