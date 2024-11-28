import { SortResumeEducationPayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface ISortResumeEducationInfra {
	sort(payload: SortResumeEducationPayload): Promise<void>;
}

export class SortResumeEducationInfra implements ISortResumeEducationInfra {
	constructor() {}

	async sort(payload: SortResumeEducationPayload): Promise<void> {
		await prisma.resumeEducationInformation.update({
			where: {
				id: payload.educationId,
			},
			data: {
				sortOrder: payload.sortOrder,
			},
		});
	}
}
