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

export interface CreateResumeExperiencePayload {
	resumeId: string;
	company: string;
	position: string;
	description: string;
	startDate: string;
	endDate: string;
	website?: string;
}
