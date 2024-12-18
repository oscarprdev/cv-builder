import { z } from 'zod';
import { Enums } from '~/features/shared/models/resume.model';

export const updateTitleDto = z.object({
	resumeId: z.string(),
	title: z.string(),
	kind: z.nativeEnum(Enums.resumeSection),
});

export type UpdateTitleDto = z.infer<typeof updateTitleDto>;
