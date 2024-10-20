import { ListResumesInput } from '../shared/types';
import { ResumeModel } from '~/features/shared/models/resume.model';

export interface ListResumesPort {
	listResumes(input: ListResumesInput): Promise<ResumeModel[]>;
}
