import { CreateResumeSkillPayload } from '../../shared/types';
import { ResumeSkillInfoModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface ICreateResumeSkillInfra {
	create(payload: CreateResumeSkillPayload): Promise<void>;
}

export class CreateResumeSkillInfra implements ICreateResumeSkillInfra {
	constructor() {}

	async create(payload: CreateResumeSkillPayload): Promise<void> {
		const currentSkills = await this.findAllSkillsByResumeId(payload.resumeId);
		const nextOrder = this.calculatenNextSortOrder(currentSkills);

		await prisma.resumeSkillInformation.create({
			data: {
				resumeId: payload.resumeId,
				name: payload.name,
				level: payload.level,
				sortOrder: nextOrder,
			},
		});
	}

	private async findAllSkillsByResumeId(resumeId: string) {
		return await prisma.resumeSkillInformation.findMany({
			where: {
				resumeId: resumeId,
			},
			orderBy: {
				sortOrder: 'asc',
			},
		});
	}

	private calculatenNextSortOrder(skills: ResumeSkillInfoModel[]) {
		return skills[skills.length - 1]?.sortOrder + 1 || 1;
	}
}
