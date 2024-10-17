import DashboardResumesList from './DashboardResumesList';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';

describe('DashboardResumesList', () => {
	it('should render successfuly', () => {
		render(<DashboardResumesList />);
	});
});
