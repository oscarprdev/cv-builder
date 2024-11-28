import { SortResumeExperiencePayload } from '../../../shared/types';

export interface SortResumeExperiencePort {
	sort: (payload: SortResumeExperiencePayload) => Promise<void>;
}
