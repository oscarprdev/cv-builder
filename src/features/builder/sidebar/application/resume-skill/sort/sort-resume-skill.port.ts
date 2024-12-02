import { SortResumeSkillPayload } from '../../../shared/types';

export interface SortResumeSkillPort {
	sort: (payload: SortResumeSkillPayload) => Promise<void>;
}
