import NewResumeDialog from './NewResumeDialog';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

describe('New Resume dialog', () => {
	it('Should render a dialog on click trigger', async () => {
		render(<NewResumeDialog />);

		const triggerDialog = screen.getByRole('button', { name: 'Create new resume' });

		fireEvent.click(triggerDialog);

		await waitFor(() => {
			screen.getByTestId('new-resume-form');

			const dialogTitle = screen.getByTestId('dialog-title');
			expect(dialogTitle.textContent).toBe('Create new resume');
		});
	});
});
