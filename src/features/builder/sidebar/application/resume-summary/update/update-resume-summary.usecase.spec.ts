/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateResumeSummaryPort } from './update-resume-summary.port';
import { UpdateResumeSummaryUsecase } from './update-resume-summary.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { UpdateResumeSummaryPayload } from '~/features/builder/sidebar/shared/types';
import { isError } from '~/lib/utils/either';

class MockUpdateResumeSummaryPort implements UpdateResumeSummaryPort {
	update(payload: UpdateResumeSummaryPayload): Promise<void> {
		return Promise.resolve();
	}
}

describe('Update resume summary usecase', () => {
	let usecase: UpdateResumeSummaryUsecase;
	let spyUpdate: MockInstance;

	beforeEach(() => {
		const repository = new MockUpdateResumeSummaryPort();
		usecase = new UpdateResumeSummaryUsecase(repository);
		spyUpdate = vi.spyOn(repository, 'update');
	});

	it('should update resume summary', async () => {
		const payload: UpdateResumeSummaryPayload = {
			resumeId: 'resumeId',
			summary: 'summary',
		};

		const response = await usecase.execute(payload);
		if (isError(response)) return;

		expect(response.success).toBeTruthy();
		expect(response.success).toBe('Resume summary updated successfully');
	});

	it('should throw error if update resume summary fails', async () => {
		const payload: UpdateResumeSummaryPayload = {
			resumeId: 'resumeId',
			summary: 'summary',
		};

		const errorMessage = 'Error updating resume summary';

		spyUpdate.mockRejectedValue(new Error(errorMessage));

		const response = await usecase.execute(payload);
		if (!isError(response)) return;

		expect(response.error).toBeTruthy();
		expect(response.error).toBe(errorMessage);
	});
});
