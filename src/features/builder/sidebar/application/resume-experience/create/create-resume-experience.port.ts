import { CreateResumeExperiencePayload } from '../../../shared/types';

export interface CreateResumeExperiencePort {
	create(input: CreateResumeExperiencePayload): Promise<void>;
}
