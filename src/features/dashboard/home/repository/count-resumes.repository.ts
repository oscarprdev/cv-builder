import { CountResumesInput } from '../../../resume/count/shared/types';
import { CountResumesPort } from '../application/count.resumes.port';
import { ICountResumesInfra } from '../infra/count-resumes.infra';

export class CountResumesRepository implements CountResumesPort {
	constructor(private readonly infra: ICountResumesInfra) {}

	async countResumes(input: CountResumesInput) {
		return await this.infra.countResumes(input);
	}
}
