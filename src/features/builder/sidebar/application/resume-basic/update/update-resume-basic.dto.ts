import { z } from 'zod';

export const updateResumeBasicDto = z.object({
	resumeId: z.string(),
	fullName: z.string(),
	headline: z.string(),
	email: z.string(),
	phone: z.string(),
	location: z.string(),
	website: z.string(),
	imageUrl: z.string().nullable(),
	imageFile: z
		.any()
		.nullable()
		.refine(file => {
			if ((file && !file.size) || !file) return true;

			return (
				file.type === 'image/png' ||
				file.type === 'image/jpeg' ||
				file.type === 'image/webp'
			);
		}, 'Invalid file type'),
});

export type UpdateResumeBasicDto = z.infer<typeof updateResumeBasicDto>;
