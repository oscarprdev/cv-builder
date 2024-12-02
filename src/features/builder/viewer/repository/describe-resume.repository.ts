import { DescribeResumePort } from '../application/resume/describe/describe-resume.port';
import { DescribeResumeInfrastructure } from '../infrastructure/describe-resume.infrastructure';
import { ResumeModel } from '~/features/shared/models/resume.model';

export class DescribeResumeRepository implements DescribeResumePort {
	constructor(private readonly infra: DescribeResumeInfrastructure) {}

	async describe(resumeId: string): Promise<ResumeModel | null> {
		return await this.infra.describe(resumeId);
	}
}
