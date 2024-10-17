import AuthForm from './AuthForm';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Toaster } from 'sonner';
import { describe, it, vi } from 'vitest';
import QueryProvider from '~/lib/react-query/provider/QueryProvider';

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

describe('Auth Form', () => {
	const mockAction = vi.fn();

	it('Should render successfuly', () => {
		render(
			<QueryProvider>
				<AuthForm
					action={mockAction}
					successRoute="/dashboard"
					header="Welcome back"
					subHeader="Sign in to your account"
					submitText="Log In"
				/>
				<Toaster />
			</QueryProvider>
		);

		screen.getByText('Welcome back');
		screen.getByText('Sign in to your account');
		screen.getByPlaceholderText('Enter your email');
		screen.getByPlaceholderText('Enter your password');
		screen.getByRole('button', { name: 'Log In' });
	});
});
