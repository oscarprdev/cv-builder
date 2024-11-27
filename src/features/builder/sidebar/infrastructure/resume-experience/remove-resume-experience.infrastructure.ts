import prisma from '~/lib/prisma/db';

export interface IRemoveResumeExperienceInfra {
	remove(experienceId: string): Promise<void>;
}

export class RemoveResumeExperienceInfra implements IRemoveResumeExperienceInfra {
	constructor() {}

	async remove(experienceId: string): Promise<void> {
		await prisma.resumeExperienceInformation.deleteMany({
			where: {
				id: experienceId,
			},
		});
	}
}
