import prisma from '~/lib/prisma/db';

export interface IDeleteResumeEducationInfra {
	delete(educationId: string): Promise<void>;
}

export class DeleteResumeEducationInfra implements IDeleteResumeEducationInfra {
	constructor() {}

	async delete(educationId: string): Promise<void> {
		await prisma.resumeEducationInformation.deleteMany({
			where: {
				id: educationId,
			},
		});
	}
}
