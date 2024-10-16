import InputPasswordForm from './InputPasswordForm';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
	title: 'InputPasswordForm',
	component: InputPasswordForm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onListenPasswordValidations: fn() },
} satisfies Meta<typeof InputPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputPassword: Story = {
	args: {
		disabled: false,
	},
};
