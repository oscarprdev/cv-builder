import { DescribeResumeSectionInfraOutput } from '../shared/infra.types';
import { ResumeEducationInfoModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeEducationInfraOutput extends DescribeResumeSectionInfraOutput {
	educationInfo: ResumeEducationInfoModel[];
}
