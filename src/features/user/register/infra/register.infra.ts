import { UserModel } from '~/features/shared/models/user.model';
import { CreateUserPayload } from '~/features/user/register/shared/types';
import { IUserClient } from '~/lib/prisma/clients/user/user.client';

export interface IRegisterInfra {
	getUserByEmail(email: string): Promise<UserModel | null>;
	createUser(payload: CreateUserPayload): Promise<void>;
}

export class RegisterInfra implements IRegisterInfra {
	constructor(private readonly client: IUserClient) {}

	async getUserByEmail(email: string): Promise<UserModel | null> {
		try {
			return await this.client.getUserByEmail(email);
		} catch {
			throw new Error('Infra error getting user by email');
		}
	}

	async createUser(payload: CreateUserPayload): Promise<void> {
		try {
			await this.client.createUser(payload);
		} catch {
			throw new Error('Infra error creating user');
		}
	}
}
