import { CreateUserPayload } from '~/features/auth/signup/shared/types';
import { UserModel } from '~/features/shared/models/user.model';

export interface RegisterPort {
	getUserByEmail(email: string): Promise<UserModel | null>;
	createUser(payload: CreateUserPayload): Promise<void>;
	hashPassword(password: string, salt: number): Promise<string>;
}
