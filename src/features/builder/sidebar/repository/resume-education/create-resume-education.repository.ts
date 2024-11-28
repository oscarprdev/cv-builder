import { CreateResumeEducationPort } from '~/features/builder/sidebar/application/resume-education/create/create-resume-education.port';
import { ICreateResumeEducationInfra } from '~/features/builder/sidebar/infrastructure/resume-education/create-resume-education.infrastructure';
import { CreateResumeEducationPayload } from '~/features/builder/sidebar/shared/types';

export class CreateResumeEducationRepository implements CreateResumeEducationPort {
	constructor(private readonly infra: ICreateResumeEducationInfra) {}

	async create(input: CreateResumeEducationPayload): Promise<void> {
		await this.infra.create(input);
	}
}
