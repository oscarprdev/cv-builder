import { DescribeResumeSummaryInfraOutput } from './resume-summary.types';
import prisma from '~/lib/prisma/db';

export interface IDescribeResumeSummaryInfra {
	describe(input: { resumeId: string }): Promise<DescribeResumeSummaryInfraOutput | null>;
}

export class DescribeResumeSummaryInfra implements IDescribeResumeSummaryInfra {
	constructor() {}

	async describe(input: { resumeId: string }): Promise<DescribeResumeSummaryInfraOutput | null> {
		const response = await prisma.resume.findUnique({
			where: {
				id: input.resumeId,
			},
			include: {
				summaryInfo: true,
				resumeMeta: true,
			},
		});

		if (!response) return null;

		return response;
	}
}
