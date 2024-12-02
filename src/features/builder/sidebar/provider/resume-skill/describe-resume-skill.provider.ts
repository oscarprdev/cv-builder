import { DescribeResumeSkillUsecase } from '~/features/builder/sidebar/application/resume-skill/describe/describe-resume-skill.usecase';
import { DescribeResumeSkillInfra } from '~/features/builder/sidebar/infrastructure/resume-skill/describe-resume-skill.infrastructure';
import { DescribeResumeSkillRepository } from '~/features/builder/sidebar/repository/resume-skill/describe-resume-skill.repository';

export const provideDescribeResumeSkillUsecase = () => {
	const infra = new DescribeResumeSkillInfra();
	const repository = new DescribeResumeSkillRepository(infra);

	return new DescribeResumeSkillUsecase(repository);
};
