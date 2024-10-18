import { DashboardPage } from './dashboard.page';
import { Locator, Page } from '@playwright/test';

export class DashboardHomePage extends DashboardPage {
	readonly header: Locator;
	readonly subHeader: Locator;

	readonly resumeDialog: Locator;
	readonly resumeDialogTrigger: Locator;
	readonly newResumeForm: Locator;

	readonly fullNameInput: Locator;
	readonly headlineInput: Locator;
	readonly emailInput: Locator;
	readonly websiteInput: Locator;
	readonly phoneInput: Locator;
	readonly locationInput: Locator;

	readonly fullNameErrorMessage: Locator;
	readonly headlineErrorMessage: Locator;
	readonly emailErrorMessage: Locator;
	readonly websiteErrorMessage: Locator;
	readonly phoneErrorMessage: Locator;
	readonly locationErrorMessage: Locator;

	constructor(readonly page: Page) {
		super(page);

		this.header = this.page.getByText('Welcome back');
		this.subHeader = this.page.getByText('Your resumes:');

		this.resumeDialog = this.page.getByTestId('new-resume-dialog');
		this.resumeDialogTrigger = this.page.getByRole('button', {
			name: 'Create new resume',
		});
		this.newResumeForm = this.page.getByTestId('new-resume-form');

		this.fullNameInput = this.newResumeForm.getByPlaceholder('Jhon Doe');
		this.headlineInput = this.newResumeForm.getByPlaceholder('Software Engineer');
		this.emailInput = this.newResumeForm.getByPlaceholder('hello@jhondoe.com');
		this.websiteInput = this.newResumeForm.getByPlaceholder('https://jhondoe.com');
		this.phoneInput = this.newResumeForm.getByPlaceholder('688121012');
		this.locationInput = this.newResumeForm.getByPlaceholder('Florida, USA');

		this.fullNameErrorMessage = this.page.getByText('Maximum length is 30 characters');
		this.headlineErrorMessage = this.page.getByText('Maximum length is 60 characters');
		this.emailErrorMessage = this.page.getByText('Invalid email format');
		this.websiteErrorMessage = this.page.getByText('Invalid URL format');
		this.phoneErrorMessage = this.page.getByText('Invalid phone number format');
		this.locationErrorMessage = this.page.getByText('Maximum length is 25 characters');
	}
}
