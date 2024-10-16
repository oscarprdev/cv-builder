import { UseCase } from '~/features/shared/application/usecase';
import { RegisterDto, registerDto } from '~/features/user/register/application/register.dto';
import { RegisterPort } from '~/features/user/register/application/register.port';
import { Either } from '~/lib/utils/either';

type Output = Either<string, string>;

export interface IRegisterUsecase {
	execute(input: RegisterDto): Promise<Output>;
}

export class RegisterUsecase extends UseCase implements IRegisterUsecase {
	readonly userAlreadyExistErrorMessage = 'User already exist';
	readonly invalidCredentialsErrorMessage = 'Error creating user';
	readonly successMessage = 'User created successfully';

	constructor(private readonly ports: RegisterPort) {
		super();
	}

	async execute(input: RegisterDto): Promise<Output> {
		try {
			const { password, email } = this.parseInput<RegisterDto>(registerDto, input);

			const user = await this.ports.getUserByEmail(email);
			if (user) throw new Error(this.userAlreadyExistErrorMessage);

			const passwordCrypted = await this.ports.hashPassword(
				password,
				Number(process.env.SALT)
			);

			await this.ports.createUser({
				email,
				password: passwordCrypted,
			});

			return this.successResponse(this.successMessage);
		} catch (error: unknown) {
			return this.errorResponse(error, this.invalidCredentialsErrorMessage);
		}
	}
}
