// import { DeleteResumeSkillPort } from '~/features/builder/sidebar/application/resume-skill/delete/delete-resume-skill.port';
import { DeleteResumeSkillPort } from '~/features/builder/sidebar/application/resume-skill/delete/delete-resume-skill.port';
import { IDeleteResumeSkillInfra } from '~/features/builder/sidebar/infrastructure/resume-skill/delete-resume-skill.infrastructure';

export class DeleteResumeSkillRepository implements DeleteResumeSkillPort {
	constructor(private readonly infra: IDeleteResumeSkillInfra) {}

	async delete(skillId: string): Promise<void> {
		return await this.infra.delete(skillId);
	}
}
