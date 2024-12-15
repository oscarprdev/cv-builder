import { DescribeResumeExperienceInfraOutput } from './resume-experience.types';
import { ResumeExperienceInfoModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface IDescribeResumeExperienceInfra {
	describe(input: { resumeId: string }): Promise<DescribeResumeExperienceInfraOutput | null>;
}

export class DescribeResumeExperienceInfra implements IDescribeResumeExperienceInfra {
	constructor() {}

	async describe(input: {
		resumeId: string;
	}): Promise<DescribeResumeExperienceInfraOutput | null> {
		const response = await prisma.resume.findUnique({
			where: {
				id: input.resumeId,
			},
			include: {
				experienceInfo: true,
				resumeMeta: true,
			},
		});

		return response;
	}
}
