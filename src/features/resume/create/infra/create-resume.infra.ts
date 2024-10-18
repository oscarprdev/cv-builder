import { CreateResumePayload } from '../shared/types';
import { ResumeModel } from '~/features/shared/models/resume.model';
import { IResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export interface ICreateResumeInfra {
	createResume(input: CreateResumePayload): Promise<ResumeModel>;
}

export class CreateResumeInfra implements ICreateResumeInfra {
	constructor(private readonly client: IResumeClient) {}

	async createResume(input: CreateResumePayload): Promise<ResumeModel> {
		try {
			return await this.client.create(input);
		} catch {
			throw new Error('Error infra creating resume');
		}
	}
}
