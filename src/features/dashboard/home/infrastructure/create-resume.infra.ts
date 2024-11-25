import { CreateResumePayload } from '../shared/types';
import { $Enums } from '@prisma/client';
import { ResumeClientResponse } from '~/features/dashboard/shared/types';
import { DEFAULT_IMAGE_URL } from '~/features/shared/constants';
import prisma from '~/lib/prisma/db';

export interface ICreateResumeInfra {
	createResume(payload: CreateResumePayload): Promise<ResumeClientResponse>;
}

export class CreateResumeInfra implements ICreateResumeInfra {
	constructor() {}

	async createResume(payload: CreateResumePayload): Promise<ResumeClientResponse> {
		try {
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
							fullName: payload.fullname,
							headline: payload.headline,
							email: payload.email,
							website: payload.website,
							phone: payload.phone,
							location: payload.location,
							imageUrl: DEFAULT_IMAGE_URL,
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
		} catch {
			throw new Error('Error infra creating resume');
		}
	}
}
