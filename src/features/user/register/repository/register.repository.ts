import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { RegisterPort } from '~/features/user/register/application/register.port';
import { RegisterInfra } from '~/features/user/register/infra/register.infra';
import { CreateUserPayload } from '~/features/user/register/shared/types';

export class RegisterRepository implements RegisterPort {
	constructor(private readonly infra: RegisterInfra) {}

	async getUserByEmail(email: string): Promise<User | null> {
		return await this.infra.getUserByEmail(email);
	}

	async createUser({ password, email }: CreateUserPayload): Promise<void> {
		await this.infra.createUser({ password, email });
	}

	async hashPassword(password: string, salt: number): Promise<string> {
		return await bcrypt.hash(password, salt);
	}
}
