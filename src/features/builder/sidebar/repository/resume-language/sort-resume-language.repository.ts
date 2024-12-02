import { SortResumeLanguagePort } from '~/features/builder/sidebar/application/resume-language/sort/sort-resume-language.port';
import { SortResumeLanguageInfra } from '~/features/builder/sidebar/infrastructure/resume-language/sort-resume-language.infrastructure';
import { SortResumeLanguagePayload } from '~/features/builder/sidebar/shared/types';

export class SortResumeLanguageRepository implements SortResumeLanguagePort {
	constructor(private readonly infra: SortResumeLanguageInfra) {}

	async sort(payload: SortResumeLanguagePayload): Promise<void> {
		return this.infra.sort(payload);
	}
}
