import { test } from './fixtures/signin.fixture';
import { expect } from '@playwright/test';

test.describe('Base page', () => {
	test.beforeEach(async ({ navigateToSigninPage }) => {
		await navigateToSigninPage();
	});

	test('Should the page be successfully rendered', async ({ signInPage }) => {
		await expect(signInPage.emailInput).toBeVisible();
		await expect(signInPage.passwordInput).toBeVisible();
		await expect(signInPage.submitButton).toBeVisible();
	});

	test('Should the form be submitted successfully', async ({ page, signInPage }) => {
		await signInPage.fillEmail('test@test.com');
		await signInPage.fillPassword('validPassword!');
		await signInPage.clickSubmit();

		await page.waitForURL('/dashboard');
	});
});
