import { UserModel } from '~/features/shared/models/user.model';
import { CreateUserPayload } from '~/features/user/register/shared/types';

export interface RegisterPort {
	getUserByEmail(email: string): Promise<UserModel | null>;
	createUser(payload: CreateUserPayload): Promise<void>;
	hashPassword(password: string, salt: number): Promise<string>;
}
