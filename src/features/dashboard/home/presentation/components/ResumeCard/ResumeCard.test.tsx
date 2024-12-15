import ResumeCard from './ResumeCard';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Enums } from '~/features/shared/models/resume.model';

describe('ResumeCard', () => {
	it('should render default card successfully', () => {
		render(
			<ResumeCard
				theme={Enums.resumeTheme.DEFAULT}
				basicInfo={{
					id: '1',
					resumeId: '1',
					fullName: 'John Doe',
					headline: 'Senior Developer',
					location: 'New York',
					phone: '123-456-7890',
					email: 'john.doe@example.com',
					website: 'https://example.com',
					imageUrl: null,
					imageDisabled: false,
				}}
			/>
		);

		screen.getByTestId('default-resume-card');
		screen.getByText('Senior Developer');

		const resumeCardLink = screen.getByTestId('resume-card-link');
		expect(resumeCardLink.getAttribute('href')).toBe('/builder/1');
	});

	it('should render loading card successfully', () => {
		render(<ResumeCard theme="fallback" />);

		screen.getByTestId('loading-resume-card');
		const loadingIcon = screen.getByTestId('loading-icon');
		expect(loadingIcon.classList.contains('animate-spin')).toBe(true);
	});

	it('should render error card successfully', () => {
		render(<ResumeCard theme="error" />);

		screen.getByTestId('error-resume-card');
		screen.getByText('Something went wrong, try again later.');
	});
});
