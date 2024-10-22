import { CountResumesInput } from '../shared/types';

export interface CountResumesPort {
	countResumes(input: CountResumesInput): Promise<number>;
}
