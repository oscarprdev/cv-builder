import { LoginUsecase } from '~/features/auth/signin/application/login.usecase';
import { LoginInfra } from '~/features/auth/signin/infrastructure/login.infra';
import { LoginRepository } from '~/features/auth/signin/repository/login.repository';

export const provideLoginUsecase = () => {
	const loginInfra = new LoginInfra();
	const loginRepository = new LoginRepository(loginInfra);

	return new LoginUsecase(loginRepository);
};
