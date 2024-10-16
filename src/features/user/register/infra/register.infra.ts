import { User } from '@prisma/client';
import { CreateUserPayload } from '~/features/user/register/shared/types';
import { UserClient } from '~/lib/prisma/clients/user/user.client';

export interface IRegisterInfra {
	getUserByEmail(email: string): Promise<User | null>;
	createUser(payload: CreateUserPayload): Promise<void>;
}

export class RegisterInfra implements IRegisterInfra {
	constructor(private readonly client: UserClient) {}

	async getUserByEmail(email: string): Promise<User | null> {
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
