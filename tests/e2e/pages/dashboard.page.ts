import { Locator, Page } from '@playwright/test';

export class DashboardPage {
	readonly dashboardAside: Locator;
	readonly homeLink: Locator;
	readonly discoverLink: Locator;
	readonly messagesLink: Locator;
	readonly supportLink: Locator;
	readonly settingsLink: Locator;

	constructor(protected readonly page: Page) {
		this.dashboardAside = this.page.getByTestId('dashboard-aside');
		this.homeLink = this.dashboardAside.getByRole('link', { name: 'Home' });
		this.discoverLink = this.dashboardAside.getByRole('link', { name: 'Discover' });
		this.messagesLink = this.dashboardAside.getByRole('link', { name: 'Messages' });
		this.supportLink = this.dashboardAside.getByRole('link', { name: 'Support' });
		this.settingsLink = this.dashboardAside.getByRole('link', { name: 'Settings' });
	}
}
