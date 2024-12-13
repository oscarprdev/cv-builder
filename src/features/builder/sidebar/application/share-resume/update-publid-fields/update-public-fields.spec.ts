import { UpdatePublicFieldsPayload } from '../../../shared/types';
import { UpdatePublicFieldsPorts } from './update-public-fields.ports';
import { UpdatePublicFieldsUsecase } from './update-public-fields.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class UpdatePublicFieldsPortsMock implements UpdatePublicFieldsPorts {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async updatePublicFields(_: UpdatePublicFieldsPayload): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

const input: UpdatePublicFieldsPayload = {
	resumeId: 'resumeId',
	isNamePublic: true,
	isEmailPublic: true,
	isPhonePublic: true,
	isLocationPublic: true,
	isWebsitePublic: true,
	isImagePublic: true,
};

describe('Update public fields use case', () => {
	let usecase: UpdatePublicFieldsUsecase;
	let spyUpdatePublicFields: MockInstance;

	beforeEach(() => {
		const mockRepository = new UpdatePublicFieldsPortsMock();
		usecase = new UpdatePublicFieldsUsecase(mockRepository);

		spyUpdatePublicFields = vi.spyOn(mockRepository, 'updatePublicFields');
	});

	it('Should return success response when execution is successful', async () => {
		spyUpdatePublicFields.mockImplementationOnce(() => Promise.resolve());

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response.success).toBeDefined();
	});

	it('should return error response if publish resume method fails', async () => {
		spyUpdatePublicFields.mockImplementationOnce(() => {
			throw new Error('Error publishing resume');
		});

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(response.error).toBe('Error publishing resume');
	});

	it('should return error response if input is not valid', async () => {
		const invalidInput = {
			resumeId: '',
			isNamePublic: 'true',
			isEmailPublic: 'true',
			isPhonePublic: 'true',
			isLocationPublic: 'true',
			isWebsitePublic: 'true',
			isImagePublic: 'true',
		} as unknown as UpdatePublicFieldsPayload;

		const response = await usecase.execute(invalidInput);

		if (!isError(response)) return;

		expect(response.error).toContain('Invalid input');
	});
});
