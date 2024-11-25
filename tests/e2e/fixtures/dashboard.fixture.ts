import { DashboardPage } from '../pages/dashboard.page';
import { test as base } from './signin.fixture';

interface DashboardFixture {
	dashboardPage: DashboardPage;
}

export const test = base.extend<DashboardFixture>({
	dashboardPage: async ({ page }, use) => {
		await use(new DashboardPage(page));
	},
});
