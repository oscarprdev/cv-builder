import SubmitButton from './SubmitButton';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

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
		text: 'Submit',
	},
};

export const Pending: Story = {
	args: {
		isPending: true,
		text: 'Submit',
	},
};
