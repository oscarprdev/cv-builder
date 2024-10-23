import { RetrieveResumeDetailInput } from '~/features/builder/shared/types';
import { ResumeModel } from '~/features/shared/models/resume.model';

export interface DetailResumePort {
	retrieveResume(input: RetrieveResumeDetailInput): Promise<ResumeModel>;
}
