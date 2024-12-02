import { DeleteResumeLanguageUsecase } from '~/features/builder/sidebar/application/resume-language/delete/delete-resume-language.usecase';
import { DeleteResumeLanguageInfra } from '~/features/builder/sidebar/infrastructure/resume-language/delete-resume-language.infrastructure';
import { DeleteResumeLanguageRepository } from '~/features/builder/sidebar/repository/resume-language/delete-resume-language.repository';

export const provideDeleteResumeLanguageUsecase = () => {
	const infra = new DeleteResumeLanguageInfra();
	const repository = new DeleteResumeLanguageRepository(infra);

	return new DeleteResumeLanguageUsecase(repository);
};
