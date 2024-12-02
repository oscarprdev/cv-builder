import { SortResumeLanguageUseCase } from '~/features/builder/sidebar/application/resume-language/sort/sort-resume-language.usecase';
import { SortResumeLanguageInfra } from '~/features/builder/sidebar/infrastructure/resume-language/sort-resume-language.infrastructure';
import { SortResumeLanguageRepository } from '~/features/builder/sidebar/repository/resume-language/sort-resume-language.repository';

export const provideSortResumeLanguageUsecase = () => {
	const infra = new SortResumeLanguageInfra();
	const repository = new SortResumeLanguageRepository(infra);

	return new SortResumeLanguageUseCase(repository);
};
