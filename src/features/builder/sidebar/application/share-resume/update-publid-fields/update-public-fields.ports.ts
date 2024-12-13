import { UpdatePublicFieldsPayload } from '../../../shared/types';

export interface UpdatePublicFieldsPorts {
	updatePublicFields: (input: UpdatePublicFieldsPayload) => Promise<void>;
}
