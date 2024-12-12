import { z } from 'zod';

export const shareSchema = z.object({
	resumeId: z.string(),
	isNamePublic: z.boolean(),
	isEmailPublic: z.boolean(),
	isPhonePublic: z.boolean(),
	isAddressPublic: z.boolean(),
	isWebsitePublic: z.boolean(),
	isPhotoPublic: z.boolean(),
});

export type ShareFormValues = z.infer<typeof shareSchema>;
