import { SortResumeSkillPort } from '~/features/builder/sidebar/application/resume-skill/sort/sort-resume-skill.port';
import { SortResumeSkillInfra } from '~/features/builder/sidebar/infrastructure/resume-skill/sort-resume-skill.infrastructure';
import { SortResumeSkillPayload } from '~/features/builder/sidebar/shared/types';

export class SortResumeSkillRepository implements SortResumeSkillPort {
	constructor(private readonly infra: SortResumeSkillInfra) {}

	async sort(payload: SortResumeSkillPayload): Promise<void> {
		return this.infra.sort(payload);
	}
}
