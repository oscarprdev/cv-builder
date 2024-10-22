import NewResumeForm from './NewResumeForm';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, vi } from 'vitest';
import QueryProvider from '~/lib/react-query/provider/QueryProvider';

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

describe('New Resume Form', () => {
	it('Should render successfuly', () => {
		render(
			<QueryProvider>
				<NewResumeForm />
			</QueryProvider>
		);

		screen.getByText('Full Name');
		screen.getByPlaceholderText('Jhon Doe');

		screen.getByText('Headline');
		screen.getByPlaceholderText('Software Engineer');

		screen.getByText('Email');
		screen.getByPlaceholderText('hello@jhondoe.com');

		screen.getByText('Website');
		screen.getByPlaceholderText('https://jhondoe.com');

		screen.getByText('Phone');
		screen.getByPlaceholderText('688121012');

		screen.getByText('Location');
		screen.getByPlaceholderText('Florida, USA');

		screen.getByRole('button', { name: 'Create Resume' });
	});
});
