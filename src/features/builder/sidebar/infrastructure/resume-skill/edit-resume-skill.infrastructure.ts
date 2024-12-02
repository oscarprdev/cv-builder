import { EditResumeSkillPayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface IEditResumeSkillInfra {
	edit(payload: EditResumeSkillPayload): Promise<void>;
}

export class EditResumeSkillInfra implements IEditResumeSkillInfra {
	constructor() {}

	async edit(payload: EditResumeSkillPayload): Promise<void> {
		await prisma.resumeSkillInformation.update({
			where: {
				id: payload.id,
			},
			data: {
				name: payload.name,
				level: payload.level,
			},
		});
	}
}
