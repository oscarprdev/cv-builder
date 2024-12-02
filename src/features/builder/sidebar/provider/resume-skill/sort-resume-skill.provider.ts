import { SortResumeSkillUseCase } from '~/features/builder/sidebar/application/resume-skill/sort/sort-resume-skill.usecase';
import { SortResumeSkillInfra } from '~/features/builder/sidebar/infrastructure/resume-skill/sort-resume-skill.infrastructure';
import { SortResumeSkillRepository } from '~/features/builder/sidebar/repository/resume-skill/sort-resume-skill.repository';

export const provideSortResumeSkillUsecase = () => {
	const infra = new SortResumeSkillInfra();
	const repository = new SortResumeSkillRepository(infra);

	return new SortResumeSkillUseCase(repository);
};
