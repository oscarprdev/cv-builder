import DashboardAside from './DashboardAside';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

const testLinksMap: { name: string; href: string }[] = [
	{
		name: 'Home',
		href: '/dashboard',
	},
	{
		name: 'Discover',
		href: '/dashboard/feed',
	},
	{
		name: 'Messages',
		href: '/dashboard/messages',
	},
	{
		name: 'Support',
		href: '/dashboard/support',
	},
	{
		name: 'Settings',
		href: '/dashboard/settings',
	},
];

describe('Dashboard aside', () => {
	it('Should render successfully', () => {
		render(<DashboardAside />);

		screen.getByTestId('dashboard-aside');

		const allLinks = screen.getAllByRole('link');
		expect(allLinks.length).toBe(5);
	});

	Object.values(testLinksMap).forEach(({ name, href }) => {
		it(`The link with name: ${name} should have the href: ${href}`, () => {
			render(<DashboardAside />);

			const link = screen.getByRole('link', { name });
			expect(link.getAttribute('href')).toBe(href);
		});
	});
});
