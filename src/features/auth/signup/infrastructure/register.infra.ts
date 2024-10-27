import { CreateUserPayload } from '~/features/auth/signup/shared/types';
import { UserModel } from '~/features/shared/models/user.model';
import prisma from '~/lib/prisma/db';

export interface IRegisterInfra {
	getUserByEmail(email: string): Promise<UserModel | null>;
	createUser(payload: CreateUserPayload): Promise<void>;
}

export class RegisterInfra implements IRegisterInfra {
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

	async createUser(payload: CreateUserPayload): Promise<void> {
		try {
			await prisma.user.create({
				data: {
					email: payload.email,
					password: payload.password,
				},
			});
		} catch {
			throw new Error('Infra error creating user');
		}
	}
}
