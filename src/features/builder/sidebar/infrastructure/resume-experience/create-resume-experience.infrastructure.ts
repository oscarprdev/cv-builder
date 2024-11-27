import { CreateResumeExperiencePayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface ICreateResumeExperienceInfra {
	create(payload: CreateResumeExperiencePayload): Promise<void>;
}

export class CreateResumeExperienceInfra implements ICreateResumeExperienceInfra {
	constructor() {}

	async create(payload: CreateResumeExperiencePayload): Promise<void> {
		await prisma.resumeExperienceInformation.create({
			data: {
				resumeId: payload.resumeId,
				company: payload.company,
				role: payload.role,
				description: payload.description,
				startDate: payload.startDate,
				endDate: payload.endDate,
				website: payload.website || '',
			},
		});
	}
}
