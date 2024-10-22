import { CountResumesDto, countResumesDto } from './count-resumes.dto';
import { CountResumesPort } from './count.resumes.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface ICountResumesUseCase {
	execute(input: CountResumesDto): Promise<Either<string, number>>;
}

export class CountResumesUseCase extends UseCase implements ICountResumesUseCase {
	constructor(private readonly ports: CountResumesPort) {
		super();
	}

	async execute(input: CountResumesDto): Promise<Either<string, number>> {
		try {
			const validInput = this.parseInput<CountResumesDto>(countResumesDto, input);

			const response = await this.ports.countResumes(validInput);

			return this.successResponse(response);
		} catch (error: unknown) {
			return this.errorResponse(error, 'Error counting resumes');
		}
	}
}
