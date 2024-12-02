import { EditResumeLanguagePayload } from '../../../shared/types';

export interface EditResumeLanguagePort {
	edit(payload: EditResumeLanguagePayload): Promise<void>;
}
