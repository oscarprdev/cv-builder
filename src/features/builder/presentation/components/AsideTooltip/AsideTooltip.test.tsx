import AsideTooltip from './AsideTooltip';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

describe('AsideTooltip', () => {
	it('should render successfully', async () => {
		const mockOnShowSection = vi.fn();

		render(
			<AsideTooltip
				section="basic"
				icon={<p>icon</p>}
				content="content"
				isActive={true}
				onShowSection={mockOnShowSection}
			/>
		);

		screen.getByTestId('aside-tooltip-trigger-basic');

		screen.getByText('icon');
		const buttonTrigger = screen.getByRole('button', { name: 'icon' });
		expect(buttonTrigger.className).toContain('bg-background-hover text-accent');
	});

	it('Should render inactive tooltip', () => {
		const mockOnShowSection = vi.fn();

		render(
			<AsideTooltip
				section="basic"
				icon={<p>icon</p>}
				content="content"
				isActive={false}
				onShowSection={mockOnShowSection}
			/>
		);

		const buttonTrigger = screen.getByRole('button', { name: 'icon' });
		expect(buttonTrigger.className).toContain('text-white');
	});

	it('Should trigger an event on trigger click', async () => {
		const mockOnShowSection = vi.fn();

		render(
			<AsideTooltip
				section="basic"
				icon={<p>icon</p>}
				content="content"
				isActive={true}
				onShowSection={mockOnShowSection}
			/>
		);

		const buttonTrigger = screen.getByRole('button', { name: 'icon' });

		fireEvent.click(buttonTrigger);
		expect(mockOnShowSection).toHaveBeenCalledWith('basic');
	});
});
