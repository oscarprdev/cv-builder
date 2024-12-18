import {
	DescribeResumeSummaryDto,
	DescribeResumeSummaryResponseDto,
} from './describe-resume-summary.dto';
import { DescribeResumeSummaryPort } from './describe-resume-summary.port';
import { DescribeResumeSummaryUseCase } from './describe-resume-summary.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

class MockDescribeResumeSummaryRepository implements DescribeResumeSummaryPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async describe(input: DescribeResumeSummaryDto): Promise<DescribeResumeSummaryResponseDto> {
		return {
			summaryInfo: {
				id: 'resumeId',
				resumeId: 'resumeId',
				summary: 'Jhon Doe',
			},
			sectionTitle: 'Summary',
		};
	}
}

describe('Describe resume summary use case', () => {
	let usecase: DescribeResumeSummaryUseCase;
	let spyDescribe: MockInstance;

	beforeEach(() => {
		const mockRepository = new MockDescribeResumeSummaryRepository();
		usecase = new DescribeResumeSummaryUseCase(mockRepository);

		spyDescribe = vi.spyOn(mockRepository, 'describe');
	});

	it('should describe resume summary info', async () => {
		const resume = {
			id: 'resumeId',
			summary: 'Jhon Doe',
		};

		spyDescribe.mockImplementationOnce(() => Promise.resolve(resume));

		const input: DescribeResumeSummaryDto = {
			resumeId: 'resumeId',
		};

		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response.success).toBe(resume);
	});

	it('should return error if describe method fails', async () => {
		const input: DescribeResumeSummaryDto = {
			resumeId: 'resumeId',
		};

		spyDescribe.mockImplementationOnce(() => Promise.reject('Error describing resume'));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Error describing resume summary');
	});

	it('should return error if resume not found', async () => {
		const input: DescribeResumeSummaryDto = {
			resumeId: 'resumeId',
		};

		spyDescribe.mockImplementationOnce(() =>
			Promise.resolve({ summaryInfo: null, sectionTitle: 'Summary' })
		);

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Summary Resume Info not found');
	});

	it('should return error if resume response is not valid', async () => {
		const input: DescribeResumeSummaryDto = {
			resumeId: 'resumeId',
		};

		spyDescribe.mockImplementationOnce(() => Promise.resolve({ notValidOuput: null }));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe(
			'Invalid output: Summary Info is required, Section Title is required'
		);
	});
});
