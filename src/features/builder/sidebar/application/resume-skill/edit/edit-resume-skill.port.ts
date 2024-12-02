import { EditResumeSkillPayload } from '../../../shared/types';

export interface EditResumeSkillPort {
	edit(payload: EditResumeSkillPayload): Promise<void>;
}
