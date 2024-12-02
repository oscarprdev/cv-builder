import { SortResumeSkillPayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface ISortResumeSkillInfra {
	sort(payload: SortResumeSkillPayload): Promise<void>;
}

export class SortResumeSkillInfra implements ISortResumeSkillInfra {
	constructor() {}

	async sort(payload: SortResumeSkillPayload): Promise<void> {
		await prisma.resumeSkillInformation.update({
			where: {
				id: payload.skillId,
			},
			data: {
				sortOrder: payload.sortOrder,
			},
		});
	}
}
