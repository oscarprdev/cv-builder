import { DashboardPage } from '../pages/dashboard.page';
import { test as base } from './signin.fixture';

interface SigninFixture {
	dashboardPage: DashboardPage;
	navigateToDashboardPage(): Promise<void>;
}

export const test = base.extend<SigninFixture>({
	dashboardPage: async ({ page }, use) => {
		await use(new DashboardPage(page));
	},
});
