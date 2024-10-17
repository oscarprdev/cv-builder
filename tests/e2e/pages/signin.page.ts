import { Locator, Page } from '@playwright/test';

export class SignInPage {
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly submitButton: Locator;

	constructor(private readonly page: Page) {
		this.emailInput = this.page.getByPlaceholder('Enter your email');
		this.passwordInput = this.page.getByPlaceholder('Enter your password');
		this.submitButton = this.page.getByRole('button', { name: 'Log In' });
	}

	async fillEmail(email: string): Promise<void> {
		await this.emailInput.fill(email);
	}

	async fillPassword(password: string): Promise<void> {
		await this.passwordInput.fill(password);
	}

	async clickSubmit(): Promise<void> {
		await this.submitButton.click();
	}
}
