import { CreateResumeSkillRepository } from '../../repository/resume-skill/create-resume-skill.repository';
import { CreateResumeSkillUsecase } from '~/features/builder/sidebar/application/resume-skill/create/create-resume-skill.usecase';
import { CreateResumeSkillInfra } from '~/features/builder/sidebar/infrastructure/resume-skill/create-resume-skill.infrastructure';

export const provideCreateResumeSkillUsecase = () => {
	const infra = new CreateResumeSkillInfra();
	const repository = new CreateResumeSkillRepository(infra);

	return new CreateResumeSkillUsecase(repository);
};
