import * as stories from './InputPassword.stories';
import { composeStories } from '@storybook/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

const { DefaultInputPassword } = composeStories(stories);

describe('Input Password', () => {
	it('Should render successfulyy', async () => {
		render(<DefaultInputPassword />);

		screen.getByText('Password');
		screen.getByText('Must be at least 8 characters');
		screen.getByText('Must contain one special character');

		const input = screen.getByPlaceholderText('Enter your password');
		expect(input.getAttribute('type')).toBe('password');
		expect(input.getAttribute('name')).toBe('password');
		expect(input.getAttribute('disabled')).not.toBeUndefined();

		const checkIcons = await screen.findAllByTestId('check-icon');
		expect(checkIcons.length).toBe(2);

		const eyeIcon = await screen.findByTestId('eye-icon');
		expect(eyeIcon).toBeDefined();
	});

	it('Should toggle input type between password and type', async () => {
		render(<DefaultInputPassword />);

		const input = screen.getByPlaceholderText('Enter your password');
		expect(input.getAttribute('type')).toBe('password');

		const eyeIcon = await screen.findByTestId('eye-icon');
		expect(eyeIcon).toBeDefined();

		fireEvent.click(eyeIcon);

		await waitFor(async () => {
			await screen.findByTestId('eye-off-icon');
			expect(input.getAttribute('type')).toBe('text');
		});
	});

	it('Should show messages as warning when value is not valid', async () => {
		render(<DefaultInputPassword />);

		const input = screen.getByPlaceholderText('Enter your password');
		const lengthMessage = screen.getByText('Must be at least 8 characters');
		const patternMessage = screen.getByText('Must contain one special character');

		fireEvent.input(input, { target: { value: 'invalid' } });

		await waitFor(async () => {
			expect(input.classList).toContain('border-destructive');
			expect(lengthMessage.parentElement?.className).toContain('text-destructive');
			expect(patternMessage.parentElement?.className).toContain('text-destructive');
		});

		fireEvent.input(input, { target: { value: 'largerPassword' } });

		await waitFor(async () => {
			expect(lengthMessage.parentElement?.className).toContain('text-muted');
			expect(patternMessage.parentElement?.className).toContain('text-destructive');
		});

		fireEvent.input(input, { target: { value: 'validPassword!' } });

		await waitFor(async () => {
			expect(lengthMessage.parentElement?.className).toContain('text-muted');
			expect(patternMessage.parentElement?.className).toContain('text-muted');
		});
	});
});
