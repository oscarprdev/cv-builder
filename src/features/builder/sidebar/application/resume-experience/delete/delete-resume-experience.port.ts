export interface DeleteResumeExperiencePort {
	delete(experienceId: string): Promise<void>;
}
