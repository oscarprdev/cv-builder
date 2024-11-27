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

export interface UpdateResumeSummaryPayload {
	resumeId: string;
	summary: string;
}

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

export type EditResumeExperienceSortOrderPayload = {
	experienceId: string;
	sortOrder: number;
}[];
