import bcrypt from 'bcryptjs';
import { UserModel } from '~/features/shared/models/user.model';
import { LoginPort } from '~/features/user/login/application/login.port';
import { LoginInfra } from '~/features/user/login/infra/login.infra';

export class LoginRepository implements LoginPort {
	constructor(private readonly infra: LoginInfra) {}

	async getUserByEmail(email: string): Promise<UserModel | null> {
		const infraUser = await this.infra.getUserByEmail(email);
		if (!infraUser) return null;

		return this.mapUserInfraToApplicationLayer(infraUser);
	}

	async comparePassword(incomingPassword: string, hashedPassword: string): Promise<boolean> {
		return await bcrypt.compare(incomingPassword, hashedPassword);
	}

	private mapUserInfraToApplicationLayer(infraUser: UserModel): UserModel {
		return {
			id: infraUser.id,
			email: infraUser.email,
			password: infraUser.password,
		};
	}
}
