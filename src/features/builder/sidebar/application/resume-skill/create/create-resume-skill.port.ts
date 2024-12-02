import { CreateResumeSkillPayload } from '../../../shared/types';

export interface CreateResumeSkillPort {
	create(input: CreateResumeSkillPayload): Promise<void>;
}
