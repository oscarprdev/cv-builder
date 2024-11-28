import { EditResumeEducationPayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface IEditResumeEducationInfra {
	edit(payload: EditResumeEducationPayload): Promise<void>;
}

export class EditResumeEducationInfra implements IEditResumeEducationInfra {
	constructor() {}

	async edit(payload: EditResumeEducationPayload): Promise<void> {
		await prisma.resumeEducationInformation.update({
			where: {
				id: payload.id,
			},
			data: {
				institution: payload.institution,
				study: payload.study,
				description: payload.description,
				startDate: payload.startDate,
				endDate: payload.endDate,
			},
		});
	}
}
