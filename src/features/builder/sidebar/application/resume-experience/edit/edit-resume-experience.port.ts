import { EditResumeExperiencePayload } from '../../../shared/types';

export interface EditResumeExperiencePort {
	edit(payload: EditResumeExperiencePayload): Promise<void>;
}
