import { UpdateResumeBasicPayload } from '~/features/builder/sidebar/shared/types';
import { IBucketClient } from '~/lib/bucket/bucket.client';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export interface IUpdateResumeBasicInfra {
	update(payload: UpdateResumeBasicPayload): Promise<void>;
	uploadImage(imageFile: File, resumeId: string, fileId: string): Promise<string>;
	deleteImage(resumeId: string): Promise<void>;
}

export class UpdateResumeBasicInfra implements IUpdateResumeBasicInfra {
	constructor(
		private readonly client: ResumeClient,
		private readonly bucketClient: IBucketClient
	) {}

	async update(payload: UpdateResumeBasicPayload): Promise<void> {
		await this.client.updateResumeBasic(payload);
	}

	async uploadImage(imageFile: File, resumeId: string, fileId: string): Promise<string> {
		return await this.bucketClient.upload(imageFile, resumeId, fileId);
	}

	async deleteImage(resumeId: string): Promise<void> {
		await this.bucketClient.findAndDelete(resumeId);
	}
}
