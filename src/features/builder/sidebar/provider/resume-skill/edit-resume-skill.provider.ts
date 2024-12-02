import { EditResumeSkillRepository } from '../../repository/resume-skill/edit-resume-skill.repository';
import { EditResumeSkillUsecase } from '~/features/builder/sidebar/application/resume-skill/edit/edit-resume-skill.usecase';
import { EditResumeSkillInfra } from '~/features/builder/sidebar/infrastructure/resume-skill/edit-resume-skill.infrastructure';

export const provideEditResumeSkillUsecase = () => {
	const infra = new EditResumeSkillInfra();
	const repository = new EditResumeSkillRepository(infra);

	return new EditResumeSkillUsecase(repository);
};
