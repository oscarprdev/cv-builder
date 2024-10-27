import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface IDescribeResumeBasicInfra {
	describe(input: { resumeId: string }): Promise<ResumeBasicInfoModel | null>;
}

export class DescribeResumeBasicInfra implements IDescribeResumeBasicInfra {
	constructor() {}

	async describe(input: { resumeId: string }): Promise<ResumeBasicInfoModel | null> {
		const response = await prisma.resume.findUnique({
			where: {
				id: input.resumeId,
			},
			include: {
				basicInfo: true,
			},
		});

		return response?.basicInfo || null;
	}
}
