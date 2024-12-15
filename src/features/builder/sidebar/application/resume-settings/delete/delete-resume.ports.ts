export interface DeleteResumePorts {
	deleteResume(resumeId: string): Promise<void>;
}
