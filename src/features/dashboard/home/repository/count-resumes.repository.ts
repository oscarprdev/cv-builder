import { CountResumesPort } from '~/features/dashboard/home/application/count-resume/count.resumes.port';
import { ICountResumesInfra } from '~/features/dashboard/home/infrastructure/count-resumes.infra';
import { CountResumesInput } from '~/features/dashboard/home/shared/types';

export class CountResumesRepository implements CountResumesPort {
	constructor(private readonly infra: ICountResumesInfra) {}

	async countResumes(input: CountResumesInput) {
		return await this.infra.countResumes(input);
	}
}
