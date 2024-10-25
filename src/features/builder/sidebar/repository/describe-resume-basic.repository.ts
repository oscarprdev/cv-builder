import { DescribeResumeBasicPort } from '../application/resume-basic/describe/describe-resume-basic.port';
import { IDescribeResumeBasicInfra } from '../infrastructure/describe-resume-basic.infrastructure';
import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';

export class DescribeResumeBasicRepository implements DescribeResumeBasicPort {
	constructor(private readonly infra: IDescribeResumeBasicInfra) {}

	async describe(input: { resumeId: string }): Promise<ResumeBasicInfoModel | null> {
		return await this.infra.describe(input);
	}
}
