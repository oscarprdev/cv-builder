import { RetrieveResumeDetailInput } from '../shared/types';
import { DetailResumePort } from './detail-resume.port';
import { DetailResumeUseCase } from './detail-resume.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { ResumeModel } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

class MockDetailResumeRepository implements DetailResumePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async retrieveResume(_: RetrieveResumeDetailInput) {
		return Promise.resolve({} as ResumeModel);
	}
}

describe('Detail Resume UseCase', () => {
	let usecase: DetailResumeUseCase;
	let spyRetrieveResume: MockInstance;

	beforeEach(() => {
		const repository = new MockDetailResumeRepository();
		usecase = new DetailResumeUseCase(repository);
		spyRetrieveResume = vi.spyOn(repository, 'retrieveResume');
	});

	it('Should respond with resume', async () => {
		spyRetrieveResume.mockImplementationOnce(() => Promise.resolve({} as ResumeModel));

		const input: RetrieveResumeDetailInput = {
			resumeId: '123',
		};

		const result = await usecase.execute(input);

		expect(isError(result)).toBe(false);

		if (isError(result)) return;

		expect(result.success).toEqual({} as ResumeModel);
		expect(spyRetrieveResume).toHaveBeenCalledWith(input);
	});

	it('Should respond with error message', async () => {
		spyRetrieveResume.mockImplementationOnce(() => Promise.reject());

		const input: RetrieveResumeDetailInput = {
			resumeId: '123',
		};

		const result = await usecase.execute(input);

		expect(isError(result)).toBe(true);

		if (!isError(result)) return;

		expect(result.error).toBe('Error retrieving resume detail');
		expect(spyRetrieveResume).toHaveBeenCalledWith(input);
	});
});
