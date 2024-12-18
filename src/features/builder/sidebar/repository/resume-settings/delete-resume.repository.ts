import { DeleteResumePorts } from '../../application/resume-settings/delete/delete-resume.ports';
import { DeleteResumeInfra } from '../../infrastructure/resume-settings/delete-resume.infrastructure';

export class DeleteResumeRepository implements DeleteResumePorts {
	constructor(private readonly infra: DeleteResumeInfra) {}

	async deleteResume(resumeId: string): Promise<void> {
		await this.infra.deleteResume(resumeId);
	}
}
