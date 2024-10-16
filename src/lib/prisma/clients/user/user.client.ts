import prisma from '../../db';
import { User } from '@prisma/client';
import { CreateUserPayload } from '~/features/user/register/shared/types';

interface IUserClient {
	getUserByEmail(email: string): Promise<User | null>;
	createUser(payload: CreateUserPayload): Promise<void>;
}

export class UserClient implements IUserClient {
	constructor() {}

	async getUserByEmail(email: string) {
		return await prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	async createUser(payload: CreateUserPayload) {
		await prisma.user.create({
			data: {
				email: payload.email,
				password: payload.password,
			},
		});
	}
}
