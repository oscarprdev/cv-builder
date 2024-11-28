import { SortResumeExperiencePort } from '~/features/builder/sidebar/application/resume-experience/sort/sort-resume-experience.port';
import { SortResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/sort-resume-experience.infrastructure';
import { SortResumeExperiencePayload } from '~/features/builder/sidebar/shared/types';

export class SortResumeExperienceRepository implements SortResumeExperiencePort {
	constructor(private readonly infra: SortResumeExperienceInfra) {}

	async sort(payload: SortResumeExperiencePayload): Promise<void> {
		return this.infra.sort(payload);
	}
}
