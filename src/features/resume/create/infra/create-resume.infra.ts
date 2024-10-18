import { CreateResumePayload } from '../shared/types';
import { IResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export interface ICreateResumeInfra {
	createResume(input: CreateResumePayload): Promise<void>;
}

export class CreateResumeInfra implements ICreateResumeInfra {
	constructor(private readonly client: IResumeClient) {}

	async createResume(input: CreateResumePayload): Promise<void> {
		try {
			await this.client.create(input);
		} catch {
			throw new Error('Error infra creating resume');
		}
	}
}
