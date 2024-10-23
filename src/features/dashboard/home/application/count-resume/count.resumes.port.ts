import { CountResumesInput } from '~/features/dashboard/home/shared/types';

export interface CountResumesPort {
	countResumes(input: CountResumesInput): Promise<number>;
}
