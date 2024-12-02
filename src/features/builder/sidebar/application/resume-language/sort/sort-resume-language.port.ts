import { SortResumeLanguagePayload } from '../../../shared/types';

export interface SortResumeLanguagePort {
	sort: (payload: SortResumeLanguagePayload) => Promise<void>;
}
