import { EditResumeSkillPort } from '~/features/builder/sidebar/application/resume-skill/edit/edit-resume-skill.port';
import { IEditResumeSkillInfra } from '~/features/builder/sidebar/infrastructure/resume-skill/edit-resume-skill.infrastructure';
import { EditResumeSkillPayload } from '~/features/builder/sidebar/shared/types';

export class EditResumeSkillRepository implements EditResumeSkillPort {
	constructor(private readonly infra: IEditResumeSkillInfra) {}

	async edit(input: EditResumeSkillPayload): Promise<void> {
		return await this.infra.edit(input);
	}
}
