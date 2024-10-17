import { test } from './fixtures/dashboard.fixture';
import { expect } from '@playwright/test';

test.describe('Dashboard page', () => {
	test.beforeEach(async ({ navigateToSigninPage, page, signInPage }) => {
		await navigateToSigninPage();

		await signInPage.fillEmail('test@test.com');
		await signInPage.fillPassword('validPassword!');
		await signInPage.clickSubmit();

		await page.waitForURL('/dashboard');
	});

	test('Should the dashboard page be successfully rendered', async ({ dashboardPage }) => {
		await expect(dashboardPage.dashboardAside).toBeVisible();
		await expect(dashboardPage.homeLink).toBeVisible();
		await expect(dashboardPage.discoverLink).toBeVisible();
		await expect(dashboardPage.messagesLink).toBeVisible();
		await expect(dashboardPage.supportLink).toBeVisible();
		await expect(dashboardPage.settingsLink).toBeVisible();
	});

	test('Should the discover link redirect to the feed page', async ({ page, dashboardPage }) => {
		await dashboardPage.discoverLink.click();
		await page.waitForURL('/dashboard/feed');
	});

	test('Should the messages link redirect to the messages page', async ({
		page,
		dashboardPage,
	}) => {
		await dashboardPage.messagesLink.click();
		await page.waitForURL('/dashboard/messages');
	});

	test('Should the support link redirect to the support page', async ({
		page,
		dashboardPage,
	}) => {
		await dashboardPage.supportLink.click();
		await page.waitForURL('/dashboard/support');
	});

	test('Should the settings link redirect to the settings page', async ({
		page,
		dashboardPage,
	}) => {
		await dashboardPage.settingsLink.click();
		await page.waitForURL('/dashboard/settings');
	});
});
