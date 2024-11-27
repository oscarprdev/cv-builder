import { z } from 'zod';

export const experienceSchema = z.object({
	id: z.string().optional(),
	company: z
		.string()
		.min(1, { message: 'Company is required' })
		.max(50, { message: 'Max 50 characters' }),
	position: z
		.string()
		.min(1, { message: 'Position is required' })
		.max(50, { message: 'Max 50 characters' }),
	startDate: z
		.string()
		.min(1, { message: 'Start date is required' })
		.max(20, { message: 'Max 20 characters' }),
	endDate: z
		.string()
		.min(1, { message: 'End date is required' })
		.max(20, { message: 'Max 20 characters' }),
	website: z
		.string()
		.url({ message: 'Website is invalid' })
		.max(50, { message: 'Max 50 characters' }),
	description: z
		.string()
		.min(1, { message: 'End date is required' })
		.max(500, { message: 'Max 500 characters' }),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
