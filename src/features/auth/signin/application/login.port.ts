export interface LoginPort {
	getUserByEmail(email: string): Promise<GetUserByEmailOutput | null>;
	comparePassword(incomingPassword: string, hashedPassword: string): Promise<boolean>;
}

export type GetUserByEmailOutput = {
	id: string;
	email: string;
	password: string;
};
