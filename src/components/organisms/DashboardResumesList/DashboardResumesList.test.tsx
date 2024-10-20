import { DashboardResumesList } from './DashboardResumesList';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

describe('DashboardResumesList', () => {
	it('should render successfuly', async () => {
		render(await DashboardResumesList({ userId: '1' }));

		screen.getByText('1');
	});
});
