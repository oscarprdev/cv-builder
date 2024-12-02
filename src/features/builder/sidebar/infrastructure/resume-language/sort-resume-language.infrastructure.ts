import { SortResumeLanguagePayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface ISortResumeLanguageInfra {
	sort(payload: SortResumeLanguagePayload): Promise<void>;
}

export class SortResumeLanguageInfra implements ISortResumeLanguageInfra {
	constructor() {}

	async sort(payload: SortResumeLanguagePayload): Promise<void> {
		await prisma.resumeLanguageInformation.update({
			where: {
				id: payload.languageId,
			},
			data: {
				sortOrder: payload.sortOrder,
			},
		});
	}
}
