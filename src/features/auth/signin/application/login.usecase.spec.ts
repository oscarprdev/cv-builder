import { LoginDto } from './login.dto';
import { LoginPort } from './login.port';
import { LoginUsecase } from './login.usecase';
import { type MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { UserModel } from '~/features/shared/models/user.model';
import { isError } from '~/lib/utils/either';

class LoginUsecaseMock implements LoginPort {
	constructor() {}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async getUserByEmail(_: string): Promise<UserModel | null> {
		return null;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async comparePassword(_: string, __: string): Promise<boolean> {
		return false;
	}
}

describe('Login usecase', () => {
	let usecase: LoginUsecase;
	let port: LoginUsecaseMock;
	let spyGetUserByEmail: MockInstance;
	let spyComparePassword: MockInstance;
	let mockUser: UserModel;
	let mockInput: LoginDto;

	beforeEach(() => {
		port = new LoginUsecaseMock();
		usecase = new LoginUsecase(port);
		spyGetUserByEmail = vi.spyOn(port, 'getUserByEmail');
		spyComparePassword = vi.spyOn(port, 'comparePassword');
		mockUser = {
			id: '1',
			email: 'test@example.com',
			password: '!hashedPassword',
		};
		mockInput = { email: 'test@example.com', password: '!hashedPassword' };
	});

	it('should return success response', async () => {
		spyComparePassword.mockImplementationOnce(() => Promise.resolve(true));
		spyGetUserByEmail.mockImplementationOnce(() => Promise.resolve(mockUser));

		const response = await usecase.execute(mockInput);

		expect(isError(response)).toBe(false);

		if (isError(response)) return;

		expect(response.success).toBeTruthy();
		expect(response.success.message).toEqual(usecase.successMessage);
		expect(response.success.data).toEqual({
			id: mockUser.id,
			email: mockUser.email,
		});
	});

	it('should return error response if password does not match', async () => {
		spyComparePassword.mockImplementationOnce(() => Promise.resolve(false));
		spyGetUserByEmail.mockImplementationOnce(() => Promise.resolve(mockUser));

		const response = await usecase.execute(mockInput);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toEqual(usecase.invalidCredentialsErrorMessage);
	});

	it('should return error response if user does not exist', async () => {
		spyComparePassword.mockImplementationOnce(() => Promise.resolve(true));
		spyGetUserByEmail.mockImplementationOnce(() => Promise.resolve(null));

		const response = await usecase.execute(mockInput);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toEqual(usecase.invalidCredentialsErrorMessage);
	});

	it('should return error response infra request fails', async () => {
		spyComparePassword.mockImplementationOnce(() => Promise.resolve(true));
		spyGetUserByEmail.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute(mockInput);

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toEqual(usecase.errorMessage);
	});

	it('should return error response if email is not valid', async () => {
		const response = await usecase.execute({ ...mockInput, email: 'invalid email' });

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toEqual('Invalid input: Invalid email');
	});

	it('should return error response if password is not valid', async () => {
		const response = await usecase.execute({ ...mockInput, password: 'invalid password' });

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toEqual('Invalid input: Invalid');
	});
});
