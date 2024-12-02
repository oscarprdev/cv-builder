import { CreateResumeSkillPort } from '~/features/builder/sidebar/application/resume-skill/create/create-resume-skill.port';
import { ICreateResumeSkillInfra } from '~/features/builder/sidebar/infrastructure/resume-skill/create-resume-skill.infrastructure';
import { CreateResumeSkillPayload } from '~/features/builder/sidebar/shared/types';

export class CreateResumeSkillRepository implements CreateResumeSkillPort {
	constructor(private readonly infra: ICreateResumeSkillInfra) {}

	async create(input: CreateResumeSkillPayload): Promise<void> {
		await this.infra.create(input);
	}
}
