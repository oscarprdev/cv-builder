import { z } from 'zod';

export const registerDto = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8)
		.regex(/[!@#$%^&*(),.?":{}|<>]/),
});

export type RegisterDto = z.infer<typeof registerDto>;
