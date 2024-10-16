import * as stories from './button.stories';
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

const { Default, Disabled } = composeStories(stories);

describe('Button', () => {
	describe('Default', () => {
		it('Should render successfulyy', () => {
			render(<Default>Default button</Default>);
			const button = screen.getByText('Default button');
			expect(button.className).toContain('bg-primary');
			expect(button.getAttribute('disabled')).toBeNull();
		});
	});

	describe('Disabled', () => {
		it('Should render successfulyy', () => {
			render(<Disabled disabled>Disabled button</Disabled>);
			const button = screen.getByText('Disabled button');
			expect(button.className).toContain('bg-primary');
			expect(button.getAttribute('disabled')).not.toBeUndefined();
		});
	});
});
