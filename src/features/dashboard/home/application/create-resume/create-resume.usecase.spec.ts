import { CreateResumePort } from './create-resume.port';
import { CreateResumeUseCase, ICreateResumeUseCase } from './create-resume.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateResumePayload } from '~/features/dashboard/home/shared/types';
import { isError } from '~/lib/utils/either';

class MockCreateResumeRepository implements CreateResumePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async createResume(_: CreateResumePayload) {
		return { resumeId: '123' };
	}
}

describe('Create Resume UseCase', () => {
	let usecase: ICreateResumeUseCase;
	let spyCreateResume: MockInstance;

	beforeEach(() => {
		const repository = new MockCreateResumeRepository();
		usecase = new CreateResumeUseCase(repository);
		spyCreateResume = vi.spyOn(repository, 'createResume');
	});

	it('Should respond with success message', async () => {
		spyCreateResume.mockImplementationOnce(() => Promise.resolve({ resumeId: '123' }));

		const input: CreateResumePayload = {
			userId: '123',
			fullname: 'John Doe',
			headline: 'Senior Developer',
			email: 'john.doe@example.com',
			phone: '123-456-7890',
			location: 'New York, NY',
			website: 'https://example.com',
		};

		const result = await usecase.execute(input);
		expect(isError(result)).toBe(false);

		if (isError(result)) return;

		expect(result.success).toEqual({ id: '123' });
		expect(spyCreateResume).toHaveBeenCalledWith(input);
	});

	it('Should respond with error message', async () => {
		spyCreateResume.mockImplementationOnce(() => Promise.reject());

		const input: CreateResumePayload = {
			userId: '123',
			fullname: 'John Doe',
			headline: 'Senior Developer',
			email: 'john.doe@example.com',
			phone: '123-456-7890',
			location: 'New York, NY',
			website: 'https://example.com',
		};
		const result = await usecase.execute(input);

		expect(isError(result)).toBe(true);

		if (!isError(result)) return;

		expect(result.error).toBe('Error creating resume');
		expect(spyCreateResume).toHaveBeenCalledWith(input);
	});

	it('Should respond with error message if input is not valid', async () => {
		const input: CreateResumePayload = {
			userId: '123',
			fullname: 'John Doe',
			headline: 'Senior Developer',
			email: 'not valid email',
			phone: '123-456-7890',
			location: 'New York, NY',
			website: 'not valid website',
		};

		const result = await usecase.execute(input);

		expect(isError(result)).toBe(true);

		if (!isError(result)) return;

		expect(result.error).toBe('Invalid input: Invalid email, Invalid url');
	});
});
