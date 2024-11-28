import { CreateResumeEducationPayload } from '~/features/builder/sidebar/shared/types';
import { ResumeEducationInfoModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface ICreateResumeEducationInfra {
	create(payload: CreateResumeEducationPayload): Promise<void>;
}

export class CreateResumeEducationInfra implements ICreateResumeEducationInfra {
	constructor() {}

	async create(payload: CreateResumeEducationPayload): Promise<void> {
		const currentEducations = await this.findAllEducationsByResumeId(payload.resumeId);
		const nextOrder = this.calculatenNextSortOrder(currentEducations);

		await prisma.resumeEducationInformation.create({
			data: {
				resumeId: payload.resumeId,
				institution: payload.institution,
				study: payload.study,
				description: payload.description,
				startDate: payload.startDate,
				endDate: payload.endDate,
				sortOrder: nextOrder,
			},
		});
	}

	private async findAllEducationsByResumeId(resumeId: string) {
		return await prisma.resumeEducationInformation.findMany({
			where: {
				resumeId: resumeId,
			},
			orderBy: {
				sortOrder: 'asc',
			},
		});
	}

	private calculatenNextSortOrder(educations: ResumeEducationInfoModel[]) {
		return educations[educations.length - 1]?.sortOrder + 1 || 1;
	}
}
