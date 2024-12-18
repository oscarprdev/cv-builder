import { DescribeResumeLanguagesInfraOutput } from './resume-language.types';
import prisma from '~/lib/prisma/db';

export interface IDescribeResumeLanguageInfra {
	describe(input: { resumeId: string }): Promise<DescribeResumeLanguagesInfraOutput | null>;
}

export class DescribeResumeLanguageInfra implements IDescribeResumeLanguageInfra {
	constructor() {}

	async describe(input: {
		resumeId: string;
	}): Promise<DescribeResumeLanguagesInfraOutput | null> {
		const response = await prisma.resume.findUnique({
			where: {
				id: input.resumeId,
			},
			include: {
				languageInfo: true,
				resumeMeta: true,
			},
		});

		return response;
	}
}
