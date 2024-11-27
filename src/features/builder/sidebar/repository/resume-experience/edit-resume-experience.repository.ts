import { EditResumeExperiencePayload } from '../../shared/types';
import { EditResumeExperiencePort } from '~/features/builder/sidebar/application/resume-experience/edit/edit-resume-experience.port';
import { IEditResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/edit-resume-experience.infrastructure';

export class EditResumeExperienceRepository implements EditResumeExperiencePort {
	constructor(private readonly infra: IEditResumeExperienceInfra) {}

	async edit(input: EditResumeExperiencePayload): Promise<void> {
		return await this.infra.edit(input);
	}
}
