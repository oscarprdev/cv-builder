import { ResumeClientResponse } from './resume.types';
import { $Enums } from '@prisma/client';
import { UpdateResumeBasicPayload } from '~/features/builder/sidebar/shared/types';
import {
	CountResumesInput,
	CreateResumePayload,
	ListResumesInput,
} from '~/features/dashboard/home/shared/types';
import { DEFAULT_IMAGE_URL } from '~/features/shared/constants';
import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';
import prisma from '~/lib/prisma/db';

export interface IResumeClient {
	create(payload: CreateResumePayload): Promise<ResumeClientResponse>;
	list(input: ListResumesInput): Promise<ResumeClientResponse[]>;
	count(input: CountResumesInput): Promise<number>;

	// Resume basic info
	describeResumeBasic(input: { resumeId: string }): Promise<ResumeBasicInfoModel | null>;
	updateResumeBasic(payload: UpdateResumeBasicPayload): Promise<void>;

	// detail(input: RetrieveResumeDetailInput): Promise<ResumeClientResponse | null>;
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

	async describeResumeBasic(input: { resumeId: string }): Promise<ResumeBasicInfoModel | null> {
		const response = await prisma.resume.findUnique({
			where: {
				id: input.resumeId,
			},
			include: {
				basicInfo: true,
			},
		});

		return response?.basicInfo || null;
	}

	async updateResumeBasic(payload: UpdateResumeBasicPayload): Promise<void> {
		if (payload.imageUrl) {
			await prisma.resume.update({
				where: {
					id: payload.resumeId,
				},
				data: {
					basicInfo: {
						update: {
							fullName: payload.fullName,
							headline: payload.headline,
							email: payload.email,
							website: payload.website,
							phone: payload.phone,
							location: payload.location,
							imageUrl: payload.imageUrl,
						},
					},
				},
			});
		} else {
			await prisma.resume.update({
				where: {
					id: payload.resumeId,
				},
				data: {
					basicInfo: {
						update: {
							fullName: payload.fullName,
							headline: payload.headline,
							email: payload.email,
							website: payload.website,
							phone: payload.phone,
							location: payload.location,
						},
					},
				},
			});
		}
	}

	// async detail(input: RetrieveResumeDetailInput): Promise<ResumeClientResponse | null> {
	// 	return await prisma.resume.findUnique({
	// 		where: {
	// 			id: input.resumeId,
	// 		},
	// 		include: {
	// 			resumeMeta: true,
	// 			basicInfo: true,
	// 		},
	// 	});
	// }
}
