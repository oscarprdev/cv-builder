import { CreateResumePayload } from '../shared/types';

export interface CreateResumePort {
	createResume(input: CreateResumePayload): Promise<{ resumeId: string }>;
}
