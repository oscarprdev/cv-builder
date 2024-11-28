import prisma from '~/lib/prisma/db';

export interface IDeleteResumeExperienceInfra {
	delete(experienceId: string): Promise<void>;
}

export class DeleteResumeExperienceInfra implements IDeleteResumeExperienceInfra {
	constructor() {}

	async delete(experienceId: string): Promise<void> {
		await prisma.resumeExperienceInformation.deleteMany({
			where: {
				id: experienceId,
			},
		});
	}
}
