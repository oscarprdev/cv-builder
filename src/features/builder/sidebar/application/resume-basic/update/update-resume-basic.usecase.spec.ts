/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateResumeBasicPayload } from '../../../shared/types';
import { UpdateResumeBasicDto } from './update-resume-basic.dto';
import { UpdateResumeBasicPort } from './update-resume-basic.port';
import { UpdateResumeBasicUseCase } from './update-resume-basic.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockUpdateResumeBasicRepository implements UpdateResumeBasicPort {
	async update(payload: UpdateResumeBasicPayload): Promise<void> {
		console.log('payload', payload);
		return;
	}

	async uploadImage(imageFile: File, resumeId: string, fileId: string): Promise<string> {
		return '';
	}

	async deleteImage(resumeId: string): Promise<void> {
		return;
	}
}

describe('Update resume basic use case', () => {
	let usecase: UpdateResumeBasicUseCase;
	let spyUpdate: MockInstance;
	let spyUploadImage: MockInstance;
	let spyDeleteImage: MockInstance;

	const commonInput: UpdateResumeBasicDto = {
		resumeId: 'resumeId',
		fullName: 'Jhon Doe',
		headline: 'Software Engineer',
		email: 'jhondoe@gmail.com',
		website: 'https://jhondoe.com',
		phone: '+911234567890',
		location: 'Florida, USA',
		imageUrl: 'https://jhondoe.com/image.png',
	};

	beforeEach(() => {
		const mockRepository = new MockUpdateResumeBasicRepository();
		usecase = new UpdateResumeBasicUseCase(mockRepository);

		spyUpdate = vi.spyOn(mockRepository, 'update');
		spyUploadImage = vi.spyOn(mockRepository, 'uploadImage');
		spyDeleteImage = vi.spyOn(mockRepository, 'deleteImage');
	});

	it('should update resume basic info', async () => {
		const input: UpdateResumeBasicDto = commonInput;

		const response = await usecase.execute(input);

		if (isError(response)) return;

		expect(response.success).toBe('Resume basic updated successfully');
	});

	it('should update resume basic info with image', async () => {
		const input: UpdateResumeBasicDto = {
			...commonInput,
			imageFile: new File(['somefile'], 'image.png', { type: 'image/png' }),
		};

		spyUploadImage.mockImplementationOnce(() => Promise.resolve('mock-imageid'));

		const response = await usecase.execute(input);

		if (isError(response)) return;

		expect(spyUpdate).toHaveBeenCalledWith({
			...commonInput,
			imageUrl: 'https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/mock-imageid',
		});

		expect(response.success).toBe('Resume basic updated successfully');
	});

	it('Should return error if update method fails', async () => {
		const input: UpdateResumeBasicDto = {
			...commonInput,
			imageFile: new File(['somefile'], 'image.png', { type: 'image/png' }),
		};

		spyUpdate.mockImplementationOnce(() => Promise.reject('Error updating resume'));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Error updating resume basic');
	});

	it('Should return error if uploadImage method fails', async () => {
		const input: UpdateResumeBasicDto = {
			...commonInput,
			imageFile: new File(['somefile'], 'image.png', { type: 'image/png' }),
		};

		spyUploadImage.mockImplementationOnce(() => Promise.reject('Error uploading image'));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Error updating resume basic');
	});

	it('Should return error if deleteImage method fails', async () => {
		const input: UpdateResumeBasicDto = {
			...commonInput,
			imageFile: new File(['somefile'], 'image.png', { type: 'image/png' }),
		};

		spyDeleteImage.mockImplementationOnce(() => Promise.reject('Error deleting image'));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Error updating resume basic');
	});
});
