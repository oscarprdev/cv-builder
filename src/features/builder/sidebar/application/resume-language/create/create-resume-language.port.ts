import { CreateResumeLanguagePayload } from '../../../shared/types';

export interface CreateResumeLanguagePort {
	create(input: CreateResumeLanguagePayload): Promise<void>;
}
