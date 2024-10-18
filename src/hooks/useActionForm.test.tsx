import { useActionForm } from './useActionForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { toast } from 'sonner';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { Either, errorResponse, successResponse } from '~/lib/utils/either';

vi.mock('sonner', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

describe('useActionForm', () => {
	let mockAction: Mock<<T>(formData: FormData) => Promise<Either<string, T>>>;
	let mockSuccessCb: Mock<() => void>;

	let queryClient: QueryClient;

	beforeEach(() => {
		queryClient = new QueryClient();
		mockAction = vi.fn();
		mockSuccessCb = vi.fn();
	});

	const wrapper = ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	it('should call the action and onSuccessCb as well', async () => {
		mockAction.mockImplementationOnce(() =>
			Promise.resolve(successResponse('Login successful'))
		);

		const { result } = renderHook(
			() =>
				useActionForm({
					action: mockAction,
					canSubmit: true,
					onSuccessCb: mockSuccessCb,
				}),
			{ wrapper }
		);

		await act(async () => {
			await result.current.handleSubmit(new FormData());
		});

		expect(mockAction).toHaveBeenCalled();
		expect(mockAction).toHaveBeenCalledWith(expect.any(FormData));

		expect(mockSuccessCb).toHaveBeenCalled();
		expect(mockSuccessCb).toHaveBeenCalledWith('Login successful');
	});

	it('should not call action when credentials are invalid', async () => {
		const { result } = renderHook(
			() =>
				useActionForm({
					action: mockAction,
					canSubmit: false,
					onSuccessCb: mockSuccessCb,
				}),
			{ wrapper }
		);

		await act(async () => {
			await result.current.handleSubmit(new FormData());
		});

		expect(toast.error).toHaveBeenCalledWith('Credentials are not valid');
		expect(mockSuccessCb).not.toHaveBeenCalled();
	});

	it('should show an error toast if action fails', async () => {
		mockAction.mockImplementationOnce(() => Promise.resolve(errorResponse('User not found')));

		const { result } = renderHook(
			() =>
				useActionForm({
					action: mockAction,
					canSubmit: true,
					onSuccessCb: mockSuccessCb,
				}),
			{ wrapper }
		);

		await act(async () => {
			await result.current.handleSubmit(new FormData());
		});

		expect(mockAction).toHaveBeenCalled();
		expect(mockSuccessCb).not.toHaveBeenCalled();
		expect(toast.error).toHaveBeenCalledWith('User not found');
	});
});
