import { SortResumeExperiencePayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface ISortResumeExperienceInfra {
	sort(payload: SortResumeExperiencePayload): Promise<void>;
}

export class SortResumeExperienceInfra implements ISortResumeExperienceInfra {
	constructor() {}

	async sort(payload: SortResumeExperiencePayload): Promise<void> {
		await prisma.resumeExperienceInformation.update({
			where: {
				id: payload.experienceId,
			},
			data: {
				sortOrder: payload.sortOrder,
			},
		});
	}
}
