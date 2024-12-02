import { EditResumeLanguagePayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface IEditResumeLanguageInfra {
	edit(payload: EditResumeLanguagePayload): Promise<void>;
}

export class EditResumeLanguageInfra implements IEditResumeLanguageInfra {
	constructor() {}

	async edit(payload: EditResumeLanguagePayload): Promise<void> {
		await prisma.resumeLanguageInformation.update({
			where: {
				id: payload.id,
			},
			data: {
				language: payload.language,
				certificationUrl: payload.certificationUrl,
				level: payload.level,
			},
		});
	}
}
