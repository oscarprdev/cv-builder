import { z } from 'zod';

export const countResumesDto = z.object({
	userId: z.string(),
});

export type CountResumesDto = z.infer<typeof countResumesDto>;
