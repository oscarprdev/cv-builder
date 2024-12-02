import { z } from 'zod';

export const skillSchema = z.object({
	id: z.string().optional(),
	name: z.string({ message: 'Skill name is required' }),
	level: z
		.number({ message: 'Level is required' })
		.min(1, { message: 'Minimum level is 1' })
		.max(5, { message: 'Maximum level is 5' }),
});

export type SkillFormValues = z.infer<typeof skillSchema>;
