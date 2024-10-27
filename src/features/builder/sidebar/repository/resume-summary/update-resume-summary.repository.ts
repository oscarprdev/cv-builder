import { UpdateResumeSummaryPort } from '../../application/resume-summary/update/update-resume-summary.port';
import { IUpdateResumeSummaryInfra } from '../../infrastructure/resume-summary/update-resume-summary.infrastructure';
import { UpdateResumeSummaryPayload } from '../../shared/types';

export class UpdateResumeSummaryRepository implements UpdateResumeSummaryPort {
	constructor(private readonly infra: IUpdateResumeSummaryInfra) {}

	async update(payload: UpdateResumeSummaryPayload): Promise<void> {
		await this.infra.update(payload);
	}
}
