import { ResumeModel } from '~/features/shared/models/resume.model';

export interface DescribeResumePort {
	describe(resumeId: string): Promise<ResumeModel | null>;
}
