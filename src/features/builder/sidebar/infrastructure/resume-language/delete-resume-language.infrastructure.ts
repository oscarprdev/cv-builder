import prisma from '~/lib/prisma/db';

export interface IDeleteResumeLanguageInfra {
	delete(languageId: string): Promise<void>;
}

export class DeleteResumeLanguageInfra implements IDeleteResumeLanguageInfra {
	constructor() {}

	async delete(languageId: string): Promise<void> {
		await prisma.resumeLanguageInformation.deleteMany({
			where: {
				id: languageId,
			},
		});
	}
}
