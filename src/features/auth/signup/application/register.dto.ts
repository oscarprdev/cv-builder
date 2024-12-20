import { z } from 'zod';

export const registerDto = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type RegisterDto = z.infer<typeof registerDto>;
