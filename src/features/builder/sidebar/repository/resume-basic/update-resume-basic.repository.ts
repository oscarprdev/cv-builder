import { UpdateResumeBasicPort } from '~/features/builder/sidebar/application/resume-basic/update/update-resume-basic.port';
import { IUpdateResumeBasicInfra } from '~/features/builder/sidebar/infrastructure/resume-basic/update-resume-basic.infrastructure';
import { UpdateResumeBasicPayload } from '~/features/builder/sidebar/shared/types';

export class UpdateResumeBasicRepository implements UpdateResumeBasicPort {
	constructor(private readonly infra: IUpdateResumeBasicInfra) {}

	async update(payload: UpdateResumeBasicPayload): Promise<void> {
		await this.infra.update(payload);
	}

	async uploadImage(imageFile: File, resumeId: string, fileId: string): Promise<string> {
		return await this.infra.uploadImage(imageFile, resumeId, fileId);
	}

	async deleteImage(resumeId: string): Promise<void> {
		await this.infra.deleteImage(resumeId);
	}
}
