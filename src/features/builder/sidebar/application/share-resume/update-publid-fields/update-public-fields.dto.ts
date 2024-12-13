import { z } from 'zod';

export const updatePublicFieldsDto = z.object({
	resumeId: z.string(),
	isNamePublic: z.boolean(),
	isEmailPublic: z.boolean(),
	isPhonePublic: z.boolean(),
	isLocationPublic: z.boolean(),
	isWebsitePublic: z.boolean(),
	isImagePublic: z.boolean(),
});

export type UpdatePublicFieldsDto = z.infer<typeof updatePublicFieldsDto>;
