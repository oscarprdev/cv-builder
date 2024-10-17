import DashboardHomePage from './DashboardHome';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';

describe('Dashboard home page', () => {
	it('Should render successfuly', () => {
		render(<DashboardHomePage />);

		screen.findByTestId('dashboard-aside');
		screen.findByTestId('dashboard-home');
	});
});
