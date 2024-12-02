import { DeleteResumeSkillUsecase } from '~/features/builder/sidebar/application/resume-skill/delete/delete-resume-skill.usecase';
import { DeleteResumeSkillInfra } from '~/features/builder/sidebar/infrastructure/resume-skill/delete-resume-skill.infrastructure';
import { DeleteResumeSkillRepository } from '~/features/builder/sidebar/repository/resume-skill/delete-resume-skill.repository';

export const provideDeleteResumeSkillUsecase = () => {
	const infra = new DeleteResumeSkillInfra();
	const repository = new DeleteResumeSkillRepository(infra);

	return new DeleteResumeSkillUsecase(repository);
};
