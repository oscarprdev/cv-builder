import * as stories from './SubmitButton.stories';
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

const { Default, Pending, Disabled } = composeStories(stories);

describe('Button', () => {
	describe('Default', () => {
		it('Should render successfulyy', () => {
			render(<Default />);

			const button = screen.getByText('Submit');

			expect(button.getAttribute('disabled')).toBeNull();
		});
	});

	describe('Pending', () => {
		it('Should render successfulyy', async () => {
			render(<Pending />);

			const button = screen.getByRole('button');
			const loaderIcon = await screen.findByTestId('loader-icon');

			expect(loaderIcon.classList).toContain('animate-spin');
			expect(button.getAttribute('disabled')).not.toBeUndefined();
		});
	});

	describe('Disabled', () => {
		it('Should render successfulyy', async () => {
			render(<Disabled />);

			const button = screen.getByRole('button');
			expect(button.getAttribute('disabled')).not.toBeUndefined();
		});
	});
});
