import { RetrieveResumeDetailInput } from '~/features/builder/shared/types';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';
import { ResumeClientResponse } from '~/lib/prisma/clients/resume/resume.types';

export interface IDetailResumeInfra {
	retrieveResume(input: RetrieveResumeDetailInput): Promise<ResumeClientResponse | null>;
}

export class DetailResumeInfra implements IDetailResumeInfra {
	constructor(private readonly client: ResumeClient) {}

	async retrieveResume(input: RetrieveResumeDetailInput): Promise<ResumeClientResponse | null> {
		return await this.client.detail(input);
	}
}
