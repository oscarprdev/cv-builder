import { CountResumesInput } from '../shared/types';
import { IResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export interface ICountResumesInfra {
	countResumes(input: CountResumesInput): Promise<number>;
}

export class CountResumesInfra implements ICountResumesInfra {
	constructor(private readonly client: IResumeClient) {}

	async countResumes(input: CountResumesInput): Promise<number> {
		try {
			return await this.client.count(input);
		} catch {
			throw new Error('Error infra counting resumes');
		}
	}
}
