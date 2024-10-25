import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export interface IDescribeResumeBasicInfra {
	describe(input: { resumeId: string }): Promise<ResumeBasicInfoModel | null>;
}

export class DescribeResumeBasicInfra implements IDescribeResumeBasicInfra {
	constructor(private readonly client: ResumeClient) {}

	async describe(input: { resumeId: string }): Promise<ResumeBasicInfoModel | null> {
		return await this.client.describeResumeBasic(input);
	}
}
