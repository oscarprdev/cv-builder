import { UpdateResumeBasicPayload } from '../../../shared/types';

export interface UpdateResumeBasicPort {
	update(payload: UpdateResumeBasicPayload): Promise<void>;
}
