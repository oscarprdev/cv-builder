import { ResumeSummaryInfoModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface IDescribeResumeSummaryInfra {
	describe(input: { resumeId: string }): Promise<ResumeSummaryInfoModel | null>;
}

export class DescribeResumeSummaryInfra implements IDescribeResumeSummaryInfra {
	constructor() {}

	async describe(input: { resumeId: string }): Promise<ResumeSummaryInfoModel | null> {
		const response = await prisma.resume.findUnique({
			where: {
				id: input.resumeId,
			},
			include: {
				summaryInfo: true,
			},
		});

		return response?.summaryInfo || null;
	}
}
