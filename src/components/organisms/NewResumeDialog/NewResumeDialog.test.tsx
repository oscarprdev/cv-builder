import NewResumeDialog from './NewResumeDialog';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import QueryProvider from '~/lib/react-query/provider/QueryProvider';

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

describe('New Resume dialog', () => {
	it('Should render a dialog on click trigger', async () => {
		render(
			<QueryProvider>
				<NewResumeDialog />
			</QueryProvider>
		);

		const triggerDialog = screen.getByRole('button', { name: 'Create new resume' });

		fireEvent.click(triggerDialog);

		await waitFor(() => {
			screen.getByTestId('new-resume-form');
			screen.getByText('Fullfill basic information to start building your resume');

			const dialogTitle = screen.getByTestId('dialog-title');
			expect(dialogTitle.textContent).toBe('Create new resume');
		});
	});
});
