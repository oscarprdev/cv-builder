import { UpdateTitlePayload } from '../../../shared/types';

export interface UpdateTitlePort {
	updateSummaryTitle(input: UpdateTitlePayload): Promise<void>;
	updateEducationTitle(input: UpdateTitlePayload): Promise<void>;
	updateExperienceTitle(input: UpdateTitlePayload): Promise<void>;
	updateSkillsTitle(input: UpdateTitlePayload): Promise<void>;
	updateLanguagesTitle(input: UpdateTitlePayload): Promise<void>;
}
