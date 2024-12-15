import { UpdateTitlePort } from '../../application/resume-meta/update-title/update-title.ports';
import { IUpdateTitleInfrastructure } from '../../infrastructure/resume-meta/update-title.infrastructure';
import { UpdateTitlePayload } from '../../shared/types';

export class UpdateTitleRepository implements UpdateTitlePort {
	constructor(private readonly infra: IUpdateTitleInfrastructure) {}

	async updateSummaryTitle(input: UpdateTitlePayload): Promise<void> {
		await this.infra.updateSummaryTitle(input);
	}

	async updateEducationTitle(input: UpdateTitlePayload): Promise<void> {
		await this.infra.updateEducationTitle(input);
	}

	async updateExperienceTitle(input: UpdateTitlePayload): Promise<void> {
		await this.infra.updateExperienceTitle(input);
	}

	async updateSkillsTitle(input: UpdateTitlePayload): Promise<void> {
		await this.infra.updateSkillsTitle(input);
	}

	async updateLanguagesTitle(input: UpdateTitlePayload): Promise<void> {
		await this.infra.updateLanguagesTitle(input);
	}
}
