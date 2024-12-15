import { DescribeResumeSectionInfraOutput } from '../shared/infra.types';
import { ResumeExperienceInfoModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeExperienceInfraOutput extends DescribeResumeSectionInfraOutput {
	experienceInfo: ResumeExperienceInfoModel[];
}
