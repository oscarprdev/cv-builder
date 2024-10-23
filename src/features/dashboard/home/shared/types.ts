export type ListResumesInput = {
	userId: string;
};

export type CreateResumePayload = {
	userId: string;
	fullName: string;
	headline: string;
	email: string;
	phone: string;
	location: string;
	website: string;
};

export type CountResumesInput = {
	userId: string;
};
