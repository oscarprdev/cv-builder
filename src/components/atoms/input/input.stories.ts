import { Input } from './input';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
	title: 'Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Default',
		type: 'text',
		placeholder: 'Placeholder',
	},
};

export const Email: Story = {
	args: {
		label: 'Email',
		type: 'email',
		placeholder: 'Enter email',
	},
};

export const Password: Story = {
	args: {
		label: 'Password',
		type: 'password',
		placeholder: 'Create password',
	},
};
