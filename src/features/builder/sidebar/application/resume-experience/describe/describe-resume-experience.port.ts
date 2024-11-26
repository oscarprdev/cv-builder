import { ResumeExperienceInfoModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeExperiencePort {
	describe(input: { resumeId: string }): Promise<ResumeExperienceInfoModel[]>;
}
