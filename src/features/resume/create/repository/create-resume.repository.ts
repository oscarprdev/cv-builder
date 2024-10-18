import { CreateResumePort } from '../application/create-resume.port';
import { ICreateResumeInfra } from '../infra/create-resume.infra';
import { CreateResumePayload } from '../shared/types';

export class CreateResumeRepository implements CreateResumePort {
	constructor(private readonly infra: ICreateResumeInfra) {}

	async createResume(input: CreateResumePayload) {
		const res = await this.infra.createResume(input);

		return {
			resumeId: res.id,
		};
	}
}
