import { SortResumeEducationPort } from '~/features/builder/sidebar/application/resume-education/sort/sort-resume-education.port';
import { SortResumeEducationInfra } from '~/features/builder/sidebar/infrastructure/resume-education/sort-resume-education.infrastructure';
import { SortResumeEducationPayload } from '~/features/builder/sidebar/shared/types';

export class SortResumeEducationRepository implements SortResumeEducationPort {
	constructor(private readonly infra: SortResumeEducationInfra) {}

	async sort(payload: SortResumeEducationPayload): Promise<void> {
		return this.infra.sort(payload);
	}
}
