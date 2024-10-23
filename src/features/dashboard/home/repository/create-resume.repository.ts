import { CreateResumePort } from '~/features/dashboard/home/application/create-resume/create-resume.port';
import { ICreateResumeInfra } from '~/features/dashboard/home/infrastructure/create-resume.infra';
import { CreateResumePayload } from '~/features/dashboard/home/shared/types';

export class CreateResumeRepository implements CreateResumePort {
	constructor(private readonly infra: ICreateResumeInfra) {}

	async createResume(input: CreateResumePayload) {
		const res = await this.infra.createResume(input);

		return {
			resumeId: res.id,
		};
	}
}
