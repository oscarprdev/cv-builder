import prisma from '~/lib/prisma/db';

export interface IDeleteResumeInfra {
	deleteResume(resumeId: string): Promise<void>;
}

export class DeleteResumeInfra implements IDeleteResumeInfra {
	async deleteResume(resumeId: string): Promise<void> {
		try {
			await prisma.resume.delete({ where: { id: resumeId } });
		} catch {
			throw new Error(`Error infra deleting resume: ${resumeId}`);
		}
	}
}
