import { CountResumesInput } from '../shared/types';
import prisma from '~/lib/prisma/db';

export interface ICountResumesInfra {
	countResumes(input: CountResumesInput): Promise<number>;
}

export class CountResumesInfra implements ICountResumesInfra {
	constructor() {}

	async countResumes(input: CountResumesInput): Promise<number> {
		try {
			return await prisma.resume.count({
				where: {
					userId: input.userId,
				},
			});
		} catch {
			throw new Error('Error infra counting resumes');
		}
	}
}
