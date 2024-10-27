import { RegisterUsecase } from '~/features/auth/signup/application/register.usecase';
import { RegisterInfra } from '~/features/auth/signup/infrastructure/register.infra';
import { RegisterRepository } from '~/features/auth/signup/repository/register.repository';

export const provideRegisterUsecase = () => {
	const registerInfra = new RegisterInfra();
	const registerRepository = new RegisterRepository(registerInfra);

	return new RegisterUsecase(registerRepository);
};
