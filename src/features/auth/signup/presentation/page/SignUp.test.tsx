import SignUpPage from './SignUp';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import QueryProvider from '~/lib/react-query/provider/QueryProvider';

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

describe('Sign up template', () => {
	it('Should render successfuly', () => {
		render(
			<QueryProvider>
				<SignUpPage />
			</QueryProvider>
		);

		screen.getByText('Get started');
		screen.getByText('Create a new account');
		screen.getByText('Have an account?');
		screen.findByTestId('auth-form');
		screen.getByRole('button', { name: 'Sign Up' });

		const link = screen.getByRole('link', { name: 'Sign In' });
		expect(link.getAttribute('href')).toBe('/signin');
	});
});
