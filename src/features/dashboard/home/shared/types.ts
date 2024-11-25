export type ListResumesInput = {
	userId: string;
};

export type CreateResumePayload = {
	userId: string;
	fullname: string;
	headline: string;
	email: string;
	phone: string;
	location: string;
	website: string;
};

export type CountResumesInput = {
	userId: string;
};
