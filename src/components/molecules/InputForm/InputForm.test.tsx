import * as stories from './InputForm.stories';
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

const { InputEmail, InputEmailDisabled } = composeStories(stories);

describe('Input', () => {
	describe('InputEmail', () => {
		it('Should render successfulyy', () => {
			render(<InputEmail />);

			screen.getByLabelText(InputEmail.args.label || '');

			const input = screen.getByPlaceholderText(InputEmail.args.placeholder || '');
			expect(input.getAttribute('type')).toBe(InputEmail.args.type);
			expect(input.getAttribute('name')).toBe(InputEmail.args.name);
		});
	});

	describe('InputEmailDisabled', () => {
		it('Should render successfulyy', () => {
			render(<InputEmailDisabled />);

			screen.getByLabelText(InputEmail.args.label || '');

			const input = screen.getByPlaceholderText(InputEmail.args.placeholder || '');
			expect(input.getAttribute('type')).toBe(InputEmail.args.type);
			expect(input.getAttribute('name')).toBe(InputEmail.args.name);
			expect(input.getAttribute('disabled')).not.toBeNull();
		});
	});
});
