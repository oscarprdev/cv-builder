import * as stories from './AsideLink.stories';
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

const { Dashboard, Settings, Support, Feed, Messages } = composeStories(stories);

describe('Button', () => {
	describe('Dashboard', () => {
		it('Should render successfully', () => {
			render(<Dashboard />);
			const link = screen.getByRole('link');
			screen.getByTestId('dashboard-icon');
			expect(link.getAttribute('href')).toBe(Dashboard.args.href);
		});
	});

	describe('Settings', () => {
		it('Should render successfully', () => {
			render(<Settings />);
			const link = screen.getByRole('link');
			screen.getByTestId('settings-icon');
			expect(link.getAttribute('href')).toBe(Settings.args.href);
		});
	});

	describe('Support', () => {
		it('Should render successfully', () => {
			render(<Support />);
			const link = screen.getByRole('link');
			screen.getByTestId('support-icon');
			expect(link.getAttribute('href')).toBe(Support.args.href);
		});
	});

	describe('Feed', () => {
		it('Should render successfully', () => {
			render(<Feed />);
			const link = screen.getByRole('link');
			screen.getByTestId('feed-icon');
			expect(link.getAttribute('href')).toBe(Feed.args.href);
		});
	});

	describe('Messages', () => {
		it('Should render successfully', () => {
			render(<Messages />);
			const link = screen.getByRole('link');
			screen.getByTestId('messages-icon');
			expect(link.getAttribute('href')).toBe(Messages.args.href);
		});
	});
});
