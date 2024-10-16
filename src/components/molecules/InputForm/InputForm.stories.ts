import InputForm from './InputForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'InputForm',
	component: InputForm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof InputForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputEmail: Story = {
	args: {
		type: 'email',
		name: 'email',
		placeholder: 'Enter your email',
		label: 'Email',
		disabled: false,
	},
};

export const InputEmailDisabled: Story = {
	args: {
		type: 'email',
		name: 'email',
		placeholder: 'Enter your email',
		label: 'Email',
		disabled: true,
	},
};
