import { ListResumesInput } from '~/features/dashboard/home/shared/types';
import { ResumeModel } from '~/features/shared/models/resume.model';

export interface ListResumesPort {
	listResumes(input: ListResumesInput): Promise<ResumeModel[]>;
}
