import { DescribeResumeSectionInfraOutput } from '../shared/infra.types';
import { ResumeSummaryInfoModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeSummaryInfraOutput extends DescribeResumeSectionInfraOutput {
	summaryInfo: ResumeSummaryInfoModel | null;
}
