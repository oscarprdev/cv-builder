import { DescribeResumeBasicDto } from './describe-resume-basic.dto';
import { DescribeResumeBasicPort } from './describe-resume-basic.port';
import { DescribeResumeBasicUseCase } from './describe-resume-basic.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

class MockDescribeResumeBasicRepository implements DescribeResumeBasicPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async describe(input: DescribeResumeBasicDto): Promise<ResumeBasicInfoModel | null> {
		return null;
	}
}

describe('Describe resume basic use case', () => {
	let usecase: DescribeResumeBasicUseCase;
	let spyDescribe: MockInstance;

	beforeEach(() => {
		const mockRepository = new MockDescribeResumeBasicRepository();
		usecase = new DescribeResumeBasicUseCase(mockRepository);

		spyDescribe = vi.spyOn(mockRepository, 'describe');
	});

	it('should describe resume basic info', async () => {
		const resume = {
			id: 'resumeId',
			fullName: 'Jhon Doe',
			headline: 'Software Engineer',
			email: 'jhondoe@gmail.com',
			website: 'https://jhondoe.com',
			phone: '+911234567890',
			location: 'Florida, USA',
			imageUrl: 'https://jhondoe.com/image.png',
		};

		spyDescribe.mockImplementationOnce(() => Promise.resolve(resume));

		const input: DescribeResumeBasicDto = {
			resumeId: 'resumeId',
		};

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response.success).toBe(resume);
	});

	it('should return error if describe method fails', async () => {
		const input: DescribeResumeBasicDto = {
			resumeId: 'resumeId',
		};

		spyDescribe.mockImplementationOnce(() => Promise.reject('Error describing resume'));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Error describing resume basic');
	});

	it('should return error if resume not found', async () => {
		const input: DescribeResumeBasicDto = {
			resumeId: 'resumeId',
		};

		spyDescribe.mockImplementationOnce(() => Promise.resolve(null));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Basic Resume Info not found');
	});
});
