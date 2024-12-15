import { Enums } from '~/features/shared/models/resume.model';

export interface LanguageActionInput {
	id?: string;
	resumeId: string;
	language: string;
	level: Enums.LanguageLevel;
	certificationUrl?: string | null;
}
