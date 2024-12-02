import { DeleteResumeLanguagePort } from '~/features/builder/sidebar/application/resume-language/delete/delete-resume-language.port';
import { IDeleteResumeLanguageInfra } from '~/features/builder/sidebar/infrastructure/resume-language/delete-resume-language.infrastructure';

export class DeleteResumeLanguageRepository implements DeleteResumeLanguagePort {
	constructor(private readonly infra: IDeleteResumeLanguageInfra) {}

	async delete(languageId: string): Promise<void> {
		return await this.infra.delete(languageId);
	}
}
