import { DescribeResumeSectionInfraOutput } from '../shared/infra.types';
import { ResumeLanguageInfoModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeLanguagesInfraOutput extends DescribeResumeSectionInfraOutput {
	languageInfo: ResumeLanguageInfoModel[];
}
