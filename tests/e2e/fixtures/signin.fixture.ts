import { SignInPage } from '../pages/signin.page';
import { test as base } from '@playwright/test';

interface SigninFixture {
	signInPage: SignInPage;
	navigateToSigninPage(): Promise<void>;
}

export const test = base.extend<SigninFixture>({
	signInPage: async ({ page }, use) => {
		await use(new SignInPage(page));
	},
	navigateToSigninPage: async ({ page }, use) => {
		await use(async (): Promise<void> => {
			await page.goto(`/signin`);
		});
	},
});
