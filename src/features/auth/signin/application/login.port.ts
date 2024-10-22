import { UserModel } from '~/features/shared/models/user.model';

export interface LoginPort {
	getUserByEmail(email: string): Promise<UserModel | null>;
	comparePassword(incomingPassword: string, hashedPassword: string): Promise<boolean>;
}
