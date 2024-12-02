import { ResumeLanguageInfoModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface IDescribeResumeLanguageInfra {
	describe(input: { resumeId: string }): Promise<ResumeLanguageInfoModel[]>;
}

export class DescribeResumeLanguageInfra implements IDescribeResumeLanguageInfra {
	constructor() {}

	async describe(input: { resumeId: string }): Promise<ResumeLanguageInfoModel[]> {
		const response = await prisma.resume.findUnique({
			where: {
				id: input.resumeId,
			},
			include: {
				languageInfo: true,
			},
		});

		return response?.languageInfo || [];
	}
}
