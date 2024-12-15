import { DescribeResumeEducationInfraOutput } from './resume-education.types';
import { ResumeEducationInfoModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface IDescribeResumeEducationInfra {
	describe(input: { resumeId: string }): Promise<DescribeResumeEducationInfraOutput | null>;
}

export class DescribeResumeEducationInfra implements IDescribeResumeEducationInfra {
	constructor() {}

	async describe(input: {
		resumeId: string;
	}): Promise<DescribeResumeEducationInfraOutput | null> {
		const response = await prisma.resume.findUnique({
			where: {
				id: input.resumeId,
			},
			include: {
				educationInfo: true,
				resumeMeta: true,
			},
		});

		return response;
	}
}
