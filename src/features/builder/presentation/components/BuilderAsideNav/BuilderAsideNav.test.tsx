import BuilderAsideNav from './BuilderAsideNav';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';

describe('Builder Aside Nav', () => {
	const sections = ['basic', 'summary', 'experience', 'education', 'skills', 'languages'];

	it('should render successfully', () => {
		render(<BuilderAsideNav sectionShowed="basic" onShowSection={() => {}} />);

		screen.getByTestId('aside-nav');

		sections.forEach(section => {
			screen.getByTestId(`aside-tooltip-trigger-${section}`);
		});
	});
});
