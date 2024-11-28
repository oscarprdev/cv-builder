import { CreateResumeEducationPayload } from '../../../shared/types';

export interface CreateResumeEducationPort {
	create(input: CreateResumeEducationPayload): Promise<void>;
}
