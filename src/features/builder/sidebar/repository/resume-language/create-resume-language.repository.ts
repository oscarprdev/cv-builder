import { CreateResumeLanguagePort } from '~/features/builder/sidebar/application/resume-language/create/create-resume-language.port';
import { ICreateResumeLanguageInfra } from '~/features/builder/sidebar/infrastructure/resume-language/create-resume-language.infrastructure';
import { CreateResumeLanguagePayload } from '~/features/builder/sidebar/shared/types';

export class CreateResumeLanguageRepository implements CreateResumeLanguagePort {
	constructor(private readonly infra: ICreateResumeLanguageInfra) {}

	async create(input: CreateResumeLanguagePayload): Promise<void> {
		await this.infra.create(input);
	}
}
