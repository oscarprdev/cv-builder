import { UserModel } from '~/features/shared/models/user.model';
import prisma from '~/lib/prisma/db';

export interface ILoginInfra {
	getUserByEmail(email: string): Promise<UserModel | null>;
}

export class LoginInfra implements ILoginInfra {
	constructor() {}

	async getUserByEmail(email: string): Promise<UserModel | null> {
		try {
			return await prisma.user.findUnique({
				where: {
					email,
				},
			});
		} catch {
			throw new Error('Infra error getting user by email');
		}
	}
}
