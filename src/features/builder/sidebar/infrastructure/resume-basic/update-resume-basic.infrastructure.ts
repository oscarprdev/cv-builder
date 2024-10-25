import { UpdateResumeBasicPayload } from '~/features/builder/sidebar/shared/types';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export interface IUpdateResumeBasicInfra {
	update(payload: UpdateResumeBasicPayload): Promise<void>;
}

export class UpdateResumeBasicInfra implements IUpdateResumeBasicInfra {
	constructor(private readonly client: ResumeClient) {}

	async update(payload: UpdateResumeBasicPayload): Promise<void> {
		await this.client.updateResumeBasic(payload);
	}
}
