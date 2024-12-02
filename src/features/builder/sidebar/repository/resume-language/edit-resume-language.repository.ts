import { EditResumeLanguagePort } from '~/features/builder/sidebar/application/resume-language/edit/edit-resume-language.port';
import { IEditResumeLanguageInfra } from '~/features/builder/sidebar/infrastructure/resume-language/edit-resume-language.infrastructure';
import { EditResumeLanguagePayload } from '~/features/builder/sidebar/shared/types';

export class EditResumeLanguageRepository implements EditResumeLanguagePort {
	constructor(private readonly infra: IEditResumeLanguageInfra) {}

	async edit(input: EditResumeLanguagePayload): Promise<void> {
		return await this.infra.edit(input);
	}
}
