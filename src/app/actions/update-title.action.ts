'use server';

import { Enums } from '~/features/shared/models/resume.model';

export type UpdateTitleActionInput = {
	value: string;
	resumeId: string;
	sectionKind: Enums.ResumeSection;
};

export const updateTitleAction = (input: UpdateTitleActionInput) => {
	console.log(input);
};
