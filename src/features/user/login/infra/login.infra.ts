import { User } from '@prisma/client';
import { UserClient } from '~/lib/prisma/clients/user/user.client';

export interface ILoginInfra {
	getUserByEmail(email: string): Promise<User | null>;
}

export class LoginInfra implements ILoginInfra {
	constructor(private readonly client: UserClient) {}

	async getUserByEmail(email: string): Promise<User | null> {
		try {
			return await this.client.getUserByEmail(email);
		} catch {
			throw new Error('Infra error getting user by email');
		}
	}
}
