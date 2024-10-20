import prisma from '../../db';
import { ResumeClientResponse } from './resume.types';
import { $Enums } from '@prisma/client';
import { CountResumesInput } from '~/features/resume/count/shared/types';
import { CreateResumePayload } from '~/features/resume/create/shared/types';
import { ListResumesInput } from '~/features/resume/list/shared/types';

export interface IResumeClient {
	create(payload: CreateResumePayload): Promise<ResumeClientResponse>;
	list(input: ListResumesInput): Promise<ResumeClientResponse[]>;
	count(input: CountResumesInput): Promise<number>;
}

export class ResumeClient implements IResumeClient {
	constructor() {}

	async create(payload: CreateResumePayload): Promise<ResumeClientResponse> {
		return await prisma.resume.create({
			data: {
				userId: payload.userId,
				resumeMeta: {
					create: {
						theme: $Enums.ResumeTheme.DEFAULT,
					},
				},
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
				resumeMeta: true,
				basicInfo: true,
			},
		});
	}

	async list(input: ListResumesInput): Promise<ResumeClientResponse[]> {
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

	async count(input: CountResumesInput): Promise<number> {
		return await prisma.resume.count({
			where: {
				userId: input.userId,
			},
		});
	}
}
