import { RegisterDto } from './register.dto';
import { RegisterPort } from './register.port';
import { RegisterUsecase } from './register.usecase';
import { type MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { isError } from '~/lib/utils/either';

// Mock implementation for RegisterPort
class RegisterUsecaseMock implements RegisterPort {
	constructor() {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async getUserByEmail(_: string) {
		return null;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async createUser(_: { email: string; password: string }): Promise<void> {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async hashPassword(_: string): Promise<string> {
		return 'hashedPassword';
	}
}

describe('Register usecase', () => {
	let usecase: RegisterUsecase;
	let port: RegisterUsecaseMock;

	let spyGetUserByEmail: MockInstance;
	let spyCreateUser: MockInstance;
	let spyHashPassword: MockInstance;

	let mockInput: RegisterDto;

	beforeEach(() => {
		port = new RegisterUsecaseMock();
		usecase = new RegisterUsecase(port);
		spyGetUserByEmail = vi.spyOn(port, 'getUserByEmail');
		spyCreateUser = vi.spyOn(port, 'createUser');
		spyHashPassword = vi.spyOn(port, 'hashPassword');
		mockInput = { email: 'test@example.com', password: 'password123!' };
	});

	it('should return success response when user is successfully created', async () => {
		spyGetUserByEmail.mockImplementationOnce(() => Promise.resolve(null));
		spyCreateUser.mockImplementationOnce(() => Promise.resolve());
		spyHashPassword.mockImplementationOnce(() => Promise.resolve('hashedPassword'));

		const response = await usecase.execute(mockInput);

		expect(isError(response)).toBe(false);
		if (isError(response)) return;

		expect(response.success).toBeTruthy();
		expect(response.success).toEqual(usecase.successMessage);
	});

	it('should return error response if user already exists', async () => {
		spyGetUserByEmail.mockImplementationOnce(() =>
			Promise.resolve({ id: '1', email: mockInput.email, password: 'hashedPassword' })
		);

		const response = await usecase.execute(mockInput);

		expect(isError(response)).toBe(true);
		if (!isError(response)) return;

		expect(response.error).toEqual(usecase.userAlreadyExistErrorMessage);
	});

	it('should return error response if user creation fails', async () => {
		spyGetUserByEmail.mockImplementationOnce(() => Promise.resolve(null));
		spyCreateUser.mockImplementationOnce(() => Promise.reject());
		spyHashPassword.mockImplementationOnce(() => Promise.resolve('hashedPassword'));

		const response = await usecase.execute(mockInput);

		expect(isError(response)).toBe(true);
		if (!isError(response)) return;

		expect(response.error).toEqual(usecase.invalidCredentialsErrorMessage);
	});

	it('should return error response if email is not valid', async () => {
		const invalidInput = { ...mockInput, email: 'invalidEmail' };
		const response = await usecase.execute(invalidInput);

		expect(isError(response)).toBe(true);
		if (!isError(response)) return;

		expect(response.error).toEqual('Invalid input: Invalid email');
	});

	it('should return error response if password is not valid', async () => {
		const invalidInput = { ...mockInput, password: 'short' };
		const response = await usecase.execute(invalidInput);

		expect(isError(response)).toBe(true);
		if (!isError(response)) return;

		expect(response.error).toEqual(
			'Invalid input: String must contain at least 8 character(s), Invalid'
		);
	});
});
