import { ListResumesInput } from '../shared/types';
import { ResumeClientResponse } from '~/features/dashboard/shared/types';
import prisma from '~/lib/prisma/db';

export interface IListResumesInfra {
	listResumes(input: ListResumesInput): Promise<ResumeClientResponse[]>;
}

export class ListResumesInfra implements IListResumesInfra {
	constructor() {}

	async listResumes(input: ListResumesInput): Promise<ResumeClientResponse[]> {
		return await prisma.resume.findMany({
			where: {
				userId: input.userId,
			},
			include: {
				resumeMeta: true,
				basicInfo: true,
			},
		});
	}
}
