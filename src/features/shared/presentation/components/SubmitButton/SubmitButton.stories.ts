import SubmitButton from './SubmitButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'SubmitButton',
	component: SubmitButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SubmitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isPending: false,
		disabled: false,
		text: 'Submit',
	},
};

export const Pending: Story = {
	args: {
		isPending: true,
		disabled: false,
		text: 'Submit',
	},
};

export const Disabled: Story = {
	args: {
		isPending: false,
		disabled: true,
		text: 'Submit',
	},
};
