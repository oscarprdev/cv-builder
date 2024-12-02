import { EditResumeLanguageRepository } from '../../repository/resume-language/edit-resume-language.repository';
import { EditResumeLanguageUsecase } from '~/features/builder/sidebar/application/resume-language/edit/edit-resume-language.usecase';
import { EditResumeLanguageInfra } from '~/features/builder/sidebar/infrastructure/resume-language/edit-resume-language.infrastructure';

export const provideEditResumeLanguageUsecase = () => {
	const infra = new EditResumeLanguageInfra();
	const repository = new EditResumeLanguageRepository(infra);

	return new EditResumeLanguageUsecase(repository);
};
