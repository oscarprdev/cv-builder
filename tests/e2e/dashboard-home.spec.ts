import { test } from './fixtures/dashboard-home.fixture';
import { expect } from '@playwright/test';

test.describe('Dashboard page', () => {
	test.beforeEach(async ({ navigateToSigninPage, page, signInPage }) => {
		await navigateToSigninPage();

		await signInPage.fillEmail('test@test.com');
		await signInPage.fillPassword('validPassword!');
		await signInPage.clickSubmit();

		await page.waitForURL('/dashboard');
	});

	test('Should the dashboard home page be successfully rendered', async ({
		dashboardHomePage,
	}) => {
		await expect(dashboardHomePage.dashboardAside).toBeVisible();
		await expect(dashboardHomePage.resumeDialogTrigger).toBeVisible();
		await expect(dashboardHomePage.header).toBeVisible();
		await expect(dashboardHomePage.subHeader).toBeVisible();
	});

	test('Should new resume dialog be opened successfully', async ({ dashboardHomePage }) => {
		await expect(dashboardHomePage.dashboardAside).toBeVisible();
		await expect(dashboardHomePage.resumeDialogTrigger).toBeVisible();

		await dashboardHomePage.resumeDialogTrigger.click();

		await expect(dashboardHomePage.newResumeForm).toBeVisible();
		await expect(dashboardHomePage.fullNameInput).toBeVisible();
		await expect(dashboardHomePage.headlineInput).toBeVisible();
		await expect(dashboardHomePage.emailInput).toBeVisible();
		await expect(dashboardHomePage.websiteInput).toBeVisible();
		await expect(dashboardHomePage.phoneInput).toBeVisible();
		await expect(dashboardHomePage.locationInput).toBeVisible();
	});

	test('Should new resume form inputs display error messages', async ({ dashboardHomePage }) => {
		await expect(dashboardHomePage.dashboardAside).toBeVisible();
		await expect(dashboardHomePage.resumeDialogTrigger).toBeVisible();

		await dashboardHomePage.resumeDialogTrigger.click();

		await expect(dashboardHomePage.newResumeForm).toBeVisible();

		await dashboardHomePage.fullNameInput.fill(Array(31).fill('a').join(''));
		await dashboardHomePage.headlineInput.fill(Array(61).fill('a').join(''));
		await dashboardHomePage.emailInput.fill('invalidEmail');
		await dashboardHomePage.websiteInput.fill('invalidUrl');
		await dashboardHomePage.phoneInput.fill('invalidPhone');
		await dashboardHomePage.locationInput.fill(Array(26).fill('a').join(''));

		await expect(dashboardHomePage.fullNameErrorMessage).toBeVisible();
		await expect(dashboardHomePage.headlineErrorMessage).toBeVisible();
		await expect(dashboardHomePage.emailErrorMessage).toBeVisible();
		await expect(dashboardHomePage.websiteErrorMessage).toBeVisible();
		await expect(dashboardHomePage.phoneErrorMessage).toBeVisible();
		await expect(dashboardHomePage.locationErrorMessage).toBeVisible();
	});
});
