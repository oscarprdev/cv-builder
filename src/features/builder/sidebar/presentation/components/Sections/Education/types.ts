import { z } from 'zod';

export const educationSchema = z.object({
	id: z.string().optional(),
	institution: z
		.string()
		.min(1, { message: 'Institution is required' })
		.max(50, { message: 'Max 50 characters' }),
	study: z
		.string()
		.min(1, { message: 'Study is required' })
		.max(50, { message: 'Max 50 characters' }),
	startDate: z
		.string()
		.min(1, { message: 'Start date is required' })
		.max(20, { message: 'Max 20 characters' }),
	endDate: z
		.string()
		.min(1, { message: 'End date is required' })
		.max(20, { message: 'Max 20 characters' }),
	description: z
		.string()
		.min(1, { message: 'Description is required' })
		.max(500, { message: 'Max 500 characters' }),
});

export type EducationFormValues = z.infer<typeof educationSchema>;
