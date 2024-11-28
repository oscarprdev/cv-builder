import { DeleteResumeEducationPort } from '~/features/builder/sidebar/application/resume-education/delete/delete-resume-education.port';
import { IDeleteResumeEducationInfra } from '~/features/builder/sidebar/infrastructure/resume-education/delete-resume-education.infrastructure';

export class DeleteResumeEducationRepository implements DeleteResumeEducationPort {
	constructor(private readonly infra: IDeleteResumeEducationInfra) {}

	async delete(educationId: string): Promise<void> {
		return await this.infra.delete(educationId);
	}
}
