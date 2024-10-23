import DashboardHomePage from './DashboardHome';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

describe('Dashboard home page', () => {
	it('Should render successfuly', async () => {
		render(await DashboardHomePage({ userId: '123' }));

		screen.findByTestId('dashboard-aside');
		screen.findByTestId('dashboard-home');
	});
});
