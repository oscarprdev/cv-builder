import { CreateResumeExperiencePort } from '~/features/builder/sidebar/application/resume-experience/create/create-resume-experience.port';
import { ICreateResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/create-resume-experience.infrastructure';
import { CreateResumeExperiencePayload } from '~/features/builder/sidebar/shared/types';

export class CreateResumeExperienceRepository implements CreateResumeExperiencePort {
	constructor(private readonly infra: ICreateResumeExperienceInfra) {}

	async create(input: CreateResumeExperiencePayload): Promise<void> {
		await this.infra.create(input);
	}
}
