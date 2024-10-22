import { UserModel } from '~/features/shared/models/user.model';
import { IUserClient } from '~/lib/prisma/clients/user/user.client';

export interface ILoginInfra {
	getUserByEmail(email: string): Promise<UserModel | null>;
}

export class LoginInfra implements ILoginInfra {
	constructor(private readonly client: IUserClient) {}

	async getUserByEmail(email: string): Promise<UserModel | null> {
		try {
			return await this.client.getUserByEmail(email);
		} catch {
			throw new Error('Infra error getting user by email');
		}
	}
}