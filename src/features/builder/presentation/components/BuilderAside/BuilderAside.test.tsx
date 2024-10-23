import BuilderAside from './BuilderAside';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';

describe('Builder Aside', () => {
	const mockBasicInfo: ResumeBasicInfoModel = {
		id: 'id',
		fullName: 'fullName',
		headline: 'headline',
		email: 'email',
		website: 'website',
		phone: 'phone',
		location: 'location',
		imageUrl: 'imageUrl',
		resumeId: 'resumeId',
	};
	it('should render successfully', async () => {
		render(<BuilderAside basicInfo={mockBasicInfo} />);

		screen.getByTestId('aside-trigger');
		screen.getByTestId('aside-trigger-icon');
		screen.getByTestId('aside-header-icon');
		screen.getByTestId('aside-nav');
		screen.getByTestId('aside-forms-container');

		const link = screen.getByRole('link');
		expect(link.getAttribute('href')).toBe('/dashboard');
	});

	it('Should hide aside forms container when trigger is clicked', async () => {
		render(<BuilderAside basicInfo={mockBasicInfo} />);
		const buttonTrigger = screen.getByTestId('aside-trigger');
		screen.getByTestId('aside-forms-container');

		fireEvent.click(buttonTrigger);

		await waitFor(() => {
			expect(screen.queryByTestId('aside-forms-container')?.classList).toContain('hidden');
		});
	});
});
