import { CountResumesUseCase } from './count-resumes.usecase';
import { CountResumesPort } from './count.resumes.port';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { CountResumesInput } from '~/features/dashboard/home/shared/types';
import { isError } from '~/lib/utils/either';

class MockCountResumesRepository implements CountResumesPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async countResumes(_: CountResumesInput) {
		return 0;
	}
}

describe('Count Resumes UseCase', () => {
	let usecase: CountResumesUseCase;
	let spyCountResumes: MockInstance;

	beforeEach(() => {
		const repository = new MockCountResumesRepository();
		usecase = new CountResumesUseCase(repository);
		spyCountResumes = vi.spyOn(repository, 'countResumes');
	});

	it('Should respond with count', async () => {
		spyCountResumes.mockImplementationOnce(() => Promise.resolve(0));

		const input: CountResumesInput = {
			userId: '123',
		};

		const result = await usecase.execute(input);
		if (isError(result)) return;

		expect(result.success).toBe(0);
	});

	it('Should respond with error message', async () => {
		spyCountResumes.mockImplementationOnce(() => Promise.reject());

		const input: CountResumesInput = {
			userId: '123',
		};

		const result = await usecase.execute(input);

		expect(isError(result)).toBe(true);

		if (!isError(result)) return;

		expect(result.error).toBe('Error counting resumes');
	});
});
