import { UpdateResumeBasicPayload } from '../../../shared/types';

export interface UpdateResumeBasicPort {
	update(payload: UpdateResumeBasicPayload): Promise<void>;
	uploadImage(imageFile: File, resumeId: string, fileId: string): Promise<string>;
	deleteImage(resumeId: string): Promise<void>;
}
