import {
	DescribeResumeLanguageDto,
	DescribeResumeLanguageResponseDto,
} from './describe-resume-language.dto';
import { DescribeResumeLanguagePort } from './describe-resume-language.port';
import { DescribeResumeLanguageUsecase } from './describe-resume-language.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { Enums, ResumeLanguageInfoModel } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

class MockDescribeResumeLanguageRepository implements DescribeResumeLanguagePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async describe(input: { resumeId: string }): Promise<DescribeResumeLanguageResponseDto> {
		return {
			languageInfo: [
				{
					id: '1',
					resumeId: 'resumeId',
					language: 'English',
					level: Enums.languageLevel.ADVANCED,
					certificationUrl: 'https://cambridge.com',
					sortOrder: 1,
				},
			],
			sectionTitle: 'Languages',
		};
	}
}

describe('Describe resume languageusecase', () => {
	let usecase: DescribeResumeLanguageUsecase;
	let describeSpy: MockInstance;

	beforeEach(() => {
		const repo = new MockDescribeResumeLanguageRepository();
		usecase = new DescribeResumeLanguageUsecase(repo);
		describeSpy = vi.spyOn(repo, 'describe');
	});

	it('Should return the proper resume language info', async () => {
		const resumeLanguage: ResumeLanguageInfoModel[] = [
			{
				id: '1',
				resumeId: 'resumeId',
				language: 'English',
				level: Enums.languageLevel.ADVANCED,
				certificationUrl: 'https://cambridge.com',
				sortOrder: 1,
			},
		];

		describeSpy.mockImplementationOnce(() => Promise.resolve(resumeLanguage));
		const input: DescribeResumeLanguageDto = {
			resumeId: 'resumeId',
		};
		const response = await usecase.execute(input);
		if (isError(response)) return;

		expect(response.success).toEqual(resumeLanguage);
	});

	it('Should return an error if describe method fails', async () => {
		const input: DescribeResumeLanguageDto = {
			resumeId: 'resumeId',
		};

		describeSpy.mockImplementationOnce(() => Promise.reject('Error describing resume'));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe('Error describing resume');
	});

	it('should return error if resume not found', async () => {
		const input: DescribeResumeLanguageDto = {
			resumeId: 'resumeId',
		};

		describeSpy.mockImplementationOnce(() => Promise.resolve(null));

		const response = await usecase.execute(input);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toBe(
			'Invalid output: Language Info and sectionTitle fields are required'
		);
	});
});
