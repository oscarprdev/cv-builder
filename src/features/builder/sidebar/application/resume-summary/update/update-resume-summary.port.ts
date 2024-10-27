import { UpdateResumeSummaryPayload } from '../../../shared/types';

export interface UpdateResumeSummaryPort {
	update(payload: UpdateResumeSummaryPayload): Promise<void>;
}
