import prisma from '~/lib/prisma/db';

export interface IDeleteResumeSkillInfra {
	delete(skillId: string): Promise<void>;
}

export class DeleteResumeSkillInfra implements IDeleteResumeSkillInfra {
	constructor() {}

	async delete(skillId: string): Promise<void> {
		await prisma.resumeSkillInformation.deleteMany({
			where: {
				id: skillId,
			},
		});
	}
}
