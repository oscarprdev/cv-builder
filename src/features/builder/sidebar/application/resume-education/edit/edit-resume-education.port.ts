import { EditResumeEducationPayload } from '../../../shared/types';

export interface EditResumeEducationPort {
	edit(payload: EditResumeEducationPayload): Promise<void>;
}
