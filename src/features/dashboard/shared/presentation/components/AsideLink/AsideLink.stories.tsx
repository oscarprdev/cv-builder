import AsideLink from './AsideLink';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'AsideLink',
	component: AsideLink,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AsideLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
	args: {
		href: '/dashboard',
		label: 'Home',
	},
};

export const Settings: Story = {
	args: {
		href: '/dashboard/settings',
		label: 'Settings',
	},
};

export const Support: Story = {
	args: {
		href: '/dashboard/support',
		label: 'Support',
	},
};

export const Feed: Story = {
	args: {
		href: '/dashboard/feed',
		label: 'Feed',
	},
};

export const Messages: Story = {
	args: {
		href: '/dashboard/messages',
		label: 'Messages',
	},
};
