import { ResumeSkillInfoModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface IDescribeResumeSkillInfra {
	describe(input: { resumeId: string }): Promise<ResumeSkillInfoModel[]>;
}

export class DescribeResumeSkillInfra implements IDescribeResumeSkillInfra {
	constructor() {}

	async describe(input: { resumeId: string }): Promise<ResumeSkillInfoModel[]> {
		const response = await prisma.resume.findUnique({
			where: {
				id: input.resumeId,
			},
			include: {
				skillInfo: true,
			},
		});

		return response?.skillInfo || [];
	}
}
