import { SortResumeEducationPayload } from '../../../shared/types';

export interface SortResumeEducationPort {
	sort: (payload: SortResumeEducationPayload) => Promise<void>;
}
