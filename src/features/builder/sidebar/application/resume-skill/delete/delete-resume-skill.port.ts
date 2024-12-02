export interface DeleteResumeSkillPort {
	delete(skillId: string): Promise<void>;
}
