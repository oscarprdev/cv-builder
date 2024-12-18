import { EditResumeExperiencePayload } from '../../../shared/types';
import { EditResumeExperienceDto } from './edit-resume-experience.dto';
import { EditResumeExperiencePort } from './edit-resume-experience.port';
import { EditResumeExperienceUsecase } from './edit-resume-experience.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockEditResumeExperienceRepository implements EditResumeExperiencePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async edit(payload: EditResumeExperiencePayload): Promise<void> {
		return;
	}
}

describe('Edit Resume Experience usecase', () => {
	let usecase: EditResumeExperienceUsecase;
	let spyEdit: MockInstance;

	const input: EditResumeExperienceDto = {
		id: '1',
		company: 'Company',
		role: 'Position',
		description: 'Description',
		startDate: '2023-01-01',
		endDate: '2023-01-01',
		website: 'https://example.com',
	};

	beforeEach(() => {
		const repository = new MockEditResumeExperienceRepository();
		usecase = new EditResumeExperienceUsecase(repository);
		spyEdit = vi.spyOn(repository, 'edit');
	});

	it('Should return success response', async () => {
		spyEdit.mockImplementationOnce(() => Promise.resolve());
		const response = await usecase.execute(input);

		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Edit resume experience success');
	});

	it('Should return error response', async () => {
		spyEdit.mockImplementationOnce(() => Promise.reject());
		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Edit resume experience failed');
	});

	it('Should return error response if the input is not valid', async () => {
		spyEdit.mockImplementationOnce(() => Promise.reject());
		const notValidInput = { invalidId: '' } as unknown as EditResumeExperienceDto;
		const response = await usecase.execute(notValidInput);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBeTruthy();
	});
});
