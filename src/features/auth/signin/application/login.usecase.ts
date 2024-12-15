import { LoginDto, loginDto } from './login.dto';
import { LoginPort } from './login.port';
import { UseCase } from '~/features/shared/application/usecase';
import { UserModel } from '~/features/shared/models/user.model';
import { Either } from '~/lib/utils/either';

type Output = Either<string, { data: Omit<UserModel, 'password'>; message: string }>;

export interface ILoginUsecase {
	execute(input: LoginDto): Promise<Output>;
}

export class LoginUsecase extends UseCase implements ILoginUsecase {
	readonly successMessage = 'User logged in successfully';
	readonly errorMessage = 'Error logging in';
	readonly invalidCredentialsErrorMessage = 'Invalid credentials';

	constructor(private readonly ports: LoginPort) {
		super();
	}

	async execute(input: LoginDto): Promise<Output> {
		try {
			const { email, password } = this.parseValue<LoginDto>('input', loginDto, input);

			const user = await this.ports.getUserByEmail(email);
			if (!user) throw new Error(this.invalidCredentialsErrorMessage);

			const passwordMatch = await this.ports.comparePassword(password, user.password);
			if (!passwordMatch) throw new Error(this.invalidCredentialsErrorMessage);

			return this.successResponse({
				data: {
					id: user.id,
					email: user.email,
				},
				message: this.successMessage,
			});
		} catch (error: unknown) {
			return this.errorResponse(error, this.errorMessage);
		}
	}
}
