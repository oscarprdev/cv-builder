import { useActionForm } from './useActionForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { errorResponse, successResponse } from '~/lib/utils/either';

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

vi.mock('sonner', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

describe('useActionForm', () => {
	const mockAction = vi.fn();
	const successRoute = '/dashboard';
	let queryClient: QueryClient;

	beforeEach(() => {
		queryClient = new QueryClient();
	});

	const wrapper = ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	it('should call the action and navigate on success', async () => {
		mockAction.mockImplementationOnce(() => successResponse('Login successful'));

		const { result } = renderHook(
			() =>
				useActionForm({
					action: mockAction,
					successRoute,
					canSubmit: true,
				}),
			{ wrapper }
		);

		await act(async () => {
			await result.current.handleSubmit(new FormData());
		});

		expect(mockAction).toHaveBeenCalled();
		expect(mockAction).toHaveBeenCalledWith(expect.any(FormData));
		expect(toast.success).toHaveBeenCalledWith('Login successful');
	});

	it('should not call action when credentials are invalid', async () => {
		const { result } = renderHook(
			() =>
				useActionForm({
					action: mockAction,
					successRoute,
					canSubmit: false,
				}),
			{ wrapper }
		);

		await act(async () => {
			await result.current.handleSubmit(new FormData());
		});

		expect(toast.error).toHaveBeenCalledWith('Credentials are not valid');
	});

	it('should show an error toast if action fails', async () => {
		mockAction.mockImplementationOnce(() => errorResponse('User not found'));

		const { result } = renderHook(
			() =>
				useActionForm({
					action: mockAction,
					successRoute,
					canSubmit: true,
				}),
			{ wrapper }
		);

		await act(async () => {
			await result.current.handleSubmit(new FormData());
		});

		expect(mockAction).toHaveBeenCalled();
		expect(toast.error).toHaveBeenCalledWith('User not found');
	});
});
