import { DetailResumePort } from '~/features/builder/application/detail-resume/detail-resume.port';
import { DetailResumeInfra } from '~/features/builder/infrastructure/detail-resume.infra';
import { RetrieveResumeDetailInput } from '~/features/builder/shared/types';
import { ResumeModel } from '~/features/shared/models/resume.model';
import { ResumeClientResponse } from '~/lib/prisma/clients/resume/resume.types';

export class DetailResumeRepository implements DetailResumePort {
	constructor(private readonly infra: DetailResumeInfra) {}

	async retrieveResume(input: RetrieveResumeDetailInput): Promise<ResumeModel> {
		const res = await this.infra.retrieveResume(input);

		if (!this.isResumeModel(res)) throw new Error('Resume not found');

		return res;
	}

	private isResumeModel(resume: ResumeClientResponse | null): resume is ResumeModel {
		return resume !== null;
	}
}
