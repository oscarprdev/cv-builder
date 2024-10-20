import { DashboardResumesList } from './DashboardResumesList';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

describe('DashboardResumesList', () => {
	it.todo('should render successfuly', async () => {
		render(await DashboardResumesList({ userId: '1' }));

		// screen.getByText('1');
	});
});
