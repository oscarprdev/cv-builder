import { CountResumesPort } from '../application/count.resumes.port';
import { ICountResumesInfra } from '../infra/count-resumes.infra';
import { CountResumesInput } from '../shared/types';

export class CountResumesRepository implements CountResumesPort {
	constructor(private readonly infra: ICountResumesInfra) {}

	async countResumes(input: CountResumesInput) {
		return await this.infra.countResumes(input);
	}
}
