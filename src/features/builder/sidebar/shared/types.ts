// Basic types
export interface UpdateResumeBasicPayload {
	resumeId: string;
	fullName: string;
	headline: string;
	email: string;
	website: string;
	phone: string;
	location: string;
	imageUrl: string | null;
}

// Summary types
export interface UpdateResumeSummaryPayload {
	resumeId: string;
	summary: string;
}

// Experience types
export interface EditResumeExperiencePayload
	extends Omit<CreateResumeExperiencePayload, 'resumeId'> {
	id: string;
}
export interface CreateResumeExperiencePayload {
	resumeId: string;
	company: string;
	role: string;
	description: string;
	startDate: string;
	endDate: string;
	website?: string;
}

export type SortResumeExperiencePayload = {
	experienceId: string;
	sortOrder: number;
};

// Education types
export interface EditResumeEducationPayload extends Omit<CreateResumeEducationPayload, 'resumeId'> {
	id: string;
}
export interface CreateResumeEducationPayload {
	resumeId: string;
	institution: string;
	study: string;
	description: string;
	startDate: string;
	endDate: string;
}

export type SortResumeEducationPayload = {
	educationId: string;
	sortOrder: number;
};

// Skills types
export interface EditResumeSkillPayload extends Omit<CreateResumeSkillPayload, 'resumeId'> {
	id: string;
}
export interface CreateResumeSkillPayload {
	resumeId: string;
	name: string;
	level: number;
}

export type SortResumeSkillPayload = {
	skillId: string;
	sortOrder: number;
};
