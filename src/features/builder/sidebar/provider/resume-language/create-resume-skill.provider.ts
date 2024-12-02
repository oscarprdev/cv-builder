import { CreateResumeLanguageRepository } from '../../repository/resume-language/create-resume-language.repository';
import { CreateResumeLanguageUsecase } from '~/features/builder/sidebar/application/resume-language/create/create-resume-language.usecase';
import { CreateResumeLanguageInfra } from '~/features/builder/sidebar/infrastructure/resume-language/create-resume-language.infrastructure';

export const provideCreateResumeLanguageUsecase = () => {
	const infra = new CreateResumeLanguageInfra();
	const repository = new CreateResumeLanguageRepository(infra);

	return new CreateResumeLanguageUsecase(repository);
};
