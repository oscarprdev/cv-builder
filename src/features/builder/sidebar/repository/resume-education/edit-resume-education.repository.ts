import { EditResumeEducationPayload } from '../../shared/types';
import { EditResumeEducationPort } from '~/features/builder/sidebar/application/resume-education/edit/edit-resume-education.port';
import { IEditResumeEducationInfra } from '~/features/builder/sidebar/infrastructure/resume-education/edit-resume-education.infrastructure';

export class EditResumeEducationRepository implements EditResumeEducationPort {
	constructor(private readonly infra: IEditResumeEducationInfra) {}

	async edit(input: EditResumeEducationPayload): Promise<void> {
		return await this.infra.edit(input);
	}
}
