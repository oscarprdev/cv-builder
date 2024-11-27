import { EditResumeExperiencePayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface IEditResumeExperienceInfra {
	edit(payload: EditResumeExperiencePayload): Promise<void>;
}

export class EditResumeExperienceInfra implements IEditResumeExperienceInfra {
	constructor() {}

	async edit(payload: EditResumeExperiencePayload): Promise<void> {
		await prisma.resumeExperienceInformation.update({
			where: {
				id: payload.id,
			},
			data: {
				company: payload.company,
				position: payload.position,
				description: payload.description,
				startDate: payload.startDate,
				endDate: payload.endDate,
				website: payload.website,
			},
		});
	}
}
