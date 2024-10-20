import { CreateResumePayload } from '../shared/types';
import { IResumeClient } from '~/lib/prisma/clients/resume/resume.client';
import { ResumeClientResponse } from '~/lib/prisma/clients/resume/resume.types';

export interface ICreateResumeInfra {
	createResume(input: CreateResumePayload): Promise<ResumeClientResponse>;
}

export class CreateResumeInfra implements ICreateResumeInfra {
	constructor(private readonly client: IResumeClient) {}

	async createResume(input: CreateResumePayload): Promise<ResumeClientResponse> {
		try {
			return await this.client.create(input);
		} catch (error) {
			console.log(error);
			throw new Error('Error infra creating resume');
		}
	}
}
