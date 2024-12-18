import { ResumeModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface IDescribeResumeInfrastructure {
	describe(resumeId: string): Promise<ResumeModel | null>;
}

export class DescribeResumeInfrastructure implements IDescribeResumeInfrastructure {
	constructor() {}

	async describe(resumeId: string): Promise<ResumeModel | null> {
		try {
			const response = await prisma.resume.findUnique({
				where: {
					id: resumeId,
				},
				include: {
					resumeMeta: true,
					basicInfo: true,
					summaryInfo: true,
					experienceInfo: true,
					educationInfo: true,
					skillInfo: true,
					languageInfo: true,
				},
			});

			if (!response || !response.resumeMeta || !response.basicInfo) {
				return null;
			}

			return response;
		} catch {
			throw new Error('Error while describing resume from DB');
		}
	}
}
