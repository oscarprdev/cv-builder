import { UpdateResumeBasicPayload } from '~/features/builder/sidebar/shared/types';
import { IBucketClient } from '~/lib/bucket/bucket.client';
import prisma from '~/lib/prisma/db';

export interface IUpdateResumeBasicInfra {
	update(payload: UpdateResumeBasicPayload): Promise<void>;
	uploadImage(imageFile: File, resumeId: string, fileId: string): Promise<string>;
	deleteImage(resumeId: string): Promise<void>;
}

export class UpdateResumeBasicInfra implements IUpdateResumeBasicInfra {
	constructor(private readonly bucketClient: IBucketClient) {}

	async update(payload: UpdateResumeBasicPayload): Promise<void> {
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

	async uploadImage(imageFile: File, resumeId: string, fileId: string): Promise<string> {
		return await this.bucketClient.upload(imageFile, resumeId, fileId);
	}

	async deleteImage(resumeId: string): Promise<void> {
		await this.bucketClient.findAndDelete(resumeId);
	}
}
