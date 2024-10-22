import { ListResumesInput } from '../shared/types';
import { IResumeClient } from '~/lib/prisma/clients/resume/resume.client';
import { ResumeClientResponse } from '~/lib/prisma/clients/resume/resume.types';

export interface IListResumesInfra {
	listResumes(input: ListResumesInput): Promise<ResumeClientResponse[]>;
}

export class ListResumesInfra implements IListResumesInfra {
	constructor(private readonly client: IResumeClient) {}

	async listResumes(input: ListResumesInput): Promise<ResumeClientResponse[]> {
		return await this.client.list(input);
	}
}
