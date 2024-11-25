import { z } from 'zod';

export const newResumeFormSchema = z.object({
	fullname: z.string({ message: 'Full name is required' }),
	headline: z.string({ message: 'Headline is required' }),
	email: z.string().email({ message: 'Invalid email format' }),
	website: z.string().url({ message: 'Invalid URL format' }),
	phone: z.string({ message: 'Phone number is required' }),
	location: z.string({ message: 'Location is required' }),
});
