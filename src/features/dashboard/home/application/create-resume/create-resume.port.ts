import { CreateResumePayload } from '~/features/dashboard/home/shared/types';

export interface CreateResumePort {
	createResume(input: CreateResumePayload): Promise<{ resumeId: string }>;
}
