import InputPassword from './InputPassword';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
	title: 'InputPassword',
	component: InputPassword,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onListenPasswordValidations: fn() },
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInputPassword: Story = {
	args: {
		disabled: false,
	},
};
