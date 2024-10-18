import * as stories from './input.stories';
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

const { Default, Email, Password } = composeStories(stories);

describe('Input', () => {
	describe('Default', () => {
		it('Should render successfulyy', () => {
			render(<Default />);
			screen.getByText(Default.args.label || '');
			const input = screen.getByPlaceholderText(Default.args.placeholder || '');
			expect(input.getAttribute('type')).toBe(Default.args.type);
		});
	});

	describe('Email', () => {
		it('Should render successfulyy', () => {
			render(<Email />);
			screen.getByText(Email.args.label || '');
			const input = screen.getByPlaceholderText(Email.args.placeholder || '');
			expect(input.getAttribute('type')).toBe(Email.args.type);
		});
	});

	describe('Password', () => {
		it('Should render successfulyy', () => {
			render(<Password />);
			screen.getByText(Password.args.label || '');
			const input = screen.getByPlaceholderText(Password.args.placeholder || '');
			expect(input.getAttribute('type')).toBe(Password.args.type);
		});
	});
});
