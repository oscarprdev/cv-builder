import { DashboardHomePage } from '../pages/dashboard-home.page';
import { test as base } from './signin.fixture';

interface SigninFixture {
	dashboardHomePage: DashboardHomePage;
}

export const test = base.extend<SigninFixture>({
	dashboardHomePage: async ({ page }, use) => {
		await use(new DashboardHomePage(page));
	},
});
