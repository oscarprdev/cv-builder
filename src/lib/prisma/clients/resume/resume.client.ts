import prisma from '../../db';
import { CreateResumePayload } from '~/features/resume/create/shared/types';
import { ResumeModel } from '~/features/shared/models/resume.model';

export interface IResumeClient {
	create(payload: CreateResumePayload): Promise<ResumeModel>;
}

export class ResumeClient implements IResumeClient {
	constructor() {}

	async create(payload: CreateResumePayload): Promise<ResumeModel> {
		return await prisma.resume.create({
			data: {
				userId: payload.userId,
				basicInfo: {
					create: {
						fullName: payload.fullName,
						headline: payload.headline,
						email: payload.email,
						website: payload.website,
						phone: payload.phone,
						location: payload.location,
						customFields: {
							create: [],
						},
					},
				},
			},
			include: {
				basicInfo: true,
			},
		});
	}
}
