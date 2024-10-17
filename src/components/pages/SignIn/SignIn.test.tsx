import SignInPage from './SignIn';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import QueryProvider from '~/lib/react-query/provider/QueryProvider';

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

describe('Sign in page', () => {
	it('Should render successfuly', () => {
		render(
			<QueryProvider>
				<SignInPage />
			</QueryProvider>
		);

		screen.getByText('Welcome back');
		screen.getByText('Sign in to your account');
		screen.findByTestId('auth-form');
		screen.getByText("Don't have an account?");
		screen.getByRole('button', { name: 'Log In' });

		const link = screen.getByRole('link', { name: 'Sign Up' });
		expect(link.getAttribute('href')).toBe('/signup');
	});
});
