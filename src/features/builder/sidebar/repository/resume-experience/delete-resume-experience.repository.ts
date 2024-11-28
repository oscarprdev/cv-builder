import { DeleteResumeExperiencePort } from '~/features/builder/sidebar/application/resume-experience/delete/delete-resume-experience.port';
import { IDeleteResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/delete-resume-experience.infrastructure';

export class DeleteResumeExperienceRepository implements DeleteResumeExperiencePort {
	constructor(private readonly infra: IDeleteResumeExperienceInfra) {}

	async delete(experienceId: string): Promise<void> {
		return await this.infra.delete(experienceId);
	}
}
