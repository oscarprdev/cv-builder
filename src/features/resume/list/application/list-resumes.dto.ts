import { z } from 'zod';

export const listResumesDto = z.object({
	userId: z.string(),
});

export type ListResumesDto = z.infer<typeof listResumesDto>;
