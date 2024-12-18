import { DescribeResumeSectionInfraOutput } from '../shared/infra.types';
import { ResumeSkillInfoModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeSkillsInfraOutput extends DescribeResumeSectionInfraOutput {
	skillInfo: ResumeSkillInfoModel[];
}
