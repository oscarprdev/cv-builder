import { ResumeExperienceInfoModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface IDescribeResumeExperienceInfra {
	describe(input: { resumeId: string }): Promise<ResumeExperienceInfoModel[]>;
}

export class DescribeResumeExperienceInfra implements IDescribeResumeExperienceInfra {
	constructor() {}

	async describe(input: { resumeId: string }): Promise<ResumeExperienceInfoModel[]> {
		const response = await prisma.resume.findUnique({
			where: {
				id: input.resumeId,
			},
			include: {
				experienceInfo: true,
			},
		});

		return response?.experienceInfo || [];
	}
}
