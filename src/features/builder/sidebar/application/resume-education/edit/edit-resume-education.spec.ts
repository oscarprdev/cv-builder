import { EditResumeEducationPayload } from '../../../shared/types';
import { EditResumeEducationDto } from './edit-resume-education.dto';
import { EditResumeEducationPort } from './edit-resume-education.port';
import { EditResumeEducationUsecase } from './edit-resume-education.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockEditResumeEducationRepository implements EditResumeEducationPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async edit(payload: EditResumeEducationPayload): Promise<void> {
		return;
	}
}

describe('Edit Resume Education usecase', () => {
	let usecase: EditResumeEducationUsecase;
	let spyEdit: MockInstance;

	const input: EditResumeEducationDto = {
		id: '1',
		institution: 'institution',
		study: 'study',
		description: 'Description',
		startDate: '2023-01-01',
		endDate: '2023-01-01',
	};

	beforeEach(() => {
		const repository = new MockEditResumeEducationRepository();
		usecase = new EditResumeEducationUsecase(repository);
		spyEdit = vi.spyOn(repository, 'edit');
	});

	it('Should return success response', async () => {
		spyEdit.mockImplementationOnce(() => Promise.resolve());
		const response = await usecase.execute(input);

		if (isError(response)) return;

		expect(response).toHaveProperty('success');
		expect(response.success).toBe('Edit resume education success');
	});

	it('Should return error response', async () => {
		spyEdit.mockImplementationOnce(() => Promise.reject());
		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBe('Edit resume education failed');
	});

	it('Should return error response if the input is not valid', async () => {
		spyEdit.mockImplementationOnce(() => Promise.reject());
		const notValidInput = { invalidId: '' } as unknown as EditResumeEducationDto;
		const response = await usecase.execute(notValidInput);

		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
		expect(response.error).toBeTruthy();
	});
});
