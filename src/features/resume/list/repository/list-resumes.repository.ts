import { ListResumesPort } from '../application/list-resumes.port';
import { IListResumesInfra } from '../infra/list-resumes.infra';
import { ListResumesInput } from '../shared/types';
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
