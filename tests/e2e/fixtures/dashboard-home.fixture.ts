import { DashboardHomePage } from '../pages/dashboard-home.page';
import { test as base } from './signin.fixture';

interface DashboardHomeFixture {
	dashboardHomePage: DashboardHomePage;
}

export const test = base.extend<DashboardHomeFixture>({
	dashboardHomePage: async ({ page }, use) => {
		await use(new DashboardHomePage(page));
	},
});
