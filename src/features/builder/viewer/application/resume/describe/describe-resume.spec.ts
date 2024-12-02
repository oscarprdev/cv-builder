/* eslint-disable @typescript-eslint/no-unused-vars */
import { DescribeResumeDto } from './describe-resume.dto';
import { DescribeResumePort } from './describe-resume.port';
import { DescribeResumeUseCase } from './describe-resume.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { ResumeModel } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

class MockDescribeResumePort implements DescribeResumePort {
	async describe(_: string): Promise<ResumeModel | null> {
		return null;
	}
}

describe('Describe Resume Use Case', () => {
	let useCase: DescribeResumeUseCase;
	let spyDescribe: MockInstance;

	beforeEach(() => {
		const repo = new MockDescribeResumePort();
		useCase = new DescribeResumeUseCase(repo);
		spyDescribe = vi.spyOn(repo, 'describe');
	});

	it('should return resume', async () => {
		spyDescribe.mockImplementationOnce(() => Promise.resolve());

		const response = await useCase.execute({ resumeId: 'resumeId' });
		if (isError(response)) return;

		expect(response).toHaveProperty('success');
	});

	it('should return error if request fails', async () => {
		spyDescribe.mockImplementationOnce(() => Promise.reject());

		const response = await useCase.execute({ resumeId: 'resumeId' });
		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
	});

	it('should return error if input is not valid', async () => {
		spyDescribe.mockImplementationOnce(() => Promise.reject());

		const response = await useCase.execute({ resumeId: 1 } as unknown as DescribeResumeDto);
		if (!isError(response)) return;

		expect(response).toHaveProperty('error');
	});
});
