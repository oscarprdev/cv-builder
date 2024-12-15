import { CreateResumeLanguagePayload } from '../../shared/types';
import { ResumeLanguageInfoModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface ICreateResumeLanguageInfra {
	create(payload: CreateResumeLanguagePayload): Promise<void>;
}

export class CreateResumeLanguageInfra implements ICreateResumeLanguageInfra {
	constructor() {}

	async create(payload: CreateResumeLanguagePayload): Promise<void> {
		const currentLanguages = await this.findAllLanguagesByResumeId(payload.resumeId);
		const nextOrder = this.calculatenNextSortOrder(currentLanguages);

		await prisma.resumeLanguageInformation.create({
			data: {
				resumeId: payload.resumeId,
				language: payload.language,
				certificationUrl: payload.certificationUrl ?? null,
				level: payload.level,
				sortOrder: nextOrder,
			},
		});
	}

	private async findAllLanguagesByResumeId(resumeId: string) {
		return await prisma.resumeLanguageInformation.findMany({
			where: {
				resumeId: resumeId,
			},
			orderBy: {
				sortOrder: 'asc',
			},
		});
	}

	private calculatenNextSortOrder(languages: ResumeLanguageInfoModel[]) {
		return languages[languages.length - 1]?.sortOrder + 1 || 1;
	}
}
