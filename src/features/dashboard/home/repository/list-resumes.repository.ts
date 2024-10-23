import { ListResumesPort } from '~/features/dashboard/home/application/list-resumes/list-resumes.port';
import { IListResumesInfra } from '~/features/dashboard/home/infrastructure/list-resumes.infra';
import { ListResumesInput } from '~/features/dashboard/home/shared/types';
import { ResumeModel } from '~/features/shared/models/resume.model';
import { ResumeClientResponse } from '~/lib/prisma/clients/resume/resume.types';

export class ListResumesRepository implements ListResumesPort {
	constructor(private readonly infra: IListResumesInfra) {}

	async listResumes(input: ListResumesInput): Promise<ResumeModel[]> {
		const infraResponse = await this.infra.listResumes(input);

		if (!this.areResumeModels(infraResponse)) {
			throw new Error('Error listing resumes without basic info');
		}

		return infraResponse;
	}

	private areResumeModels(resumes: ResumeClientResponse[]): resumes is ResumeModel[] {
		return resumes.every(resume => resume.basicInfo && resume.resumeMeta);
	}
}
