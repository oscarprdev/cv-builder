import { RemoveResumeExperiencePort } from '~/features/builder/sidebar/application/resume-experience/remove/remove-resume-experience.port';
import { IRemoveResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/remove-resume-experience.infrastructure';

export class RemoveResumeExperienceRepository implements RemoveResumeExperiencePort {
	constructor(private readonly infra: IRemoveResumeExperienceInfra) {}

	async remove(experienceId: string): Promise<void> {
		return await this.infra.remove(experienceId);
	}
}
