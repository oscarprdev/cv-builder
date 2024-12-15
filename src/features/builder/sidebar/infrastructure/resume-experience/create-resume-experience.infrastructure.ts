
import { CreateResumeExperiencePayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface ICreateResumeExperienceInfra {
	create(payload: CreateResumeExperiencePayload): Promise<void>;
}

export class CreateResumeExperienceInfra implements ICreateResumeExperienceInfra {
	constructor() {}

	async create(payload: CreateResumeExperiencePayload): Promise<void> {
		const currentExperiences = await prisma.resumeExperienceInformation.findMany({
			where: {
				resumeId: payload.resumeId,
			},
			orderBy: {
				sortOrder: 'asc',
			},
		});

		await prisma.resumeExperienceInformation.create({
			data: {
				resumeId: payload.resumeId,
				company: payload.company,
				role: payload.role,
				description: payload.description,
				startDate: payload.startDate,
				endDate: payload.endDate,
				website: payload.website || '',
				sortOrder: currentExperiences[currentExperiences.length - 1]?.sortOrder + 1 || 1,
			},
		});
	}
}
