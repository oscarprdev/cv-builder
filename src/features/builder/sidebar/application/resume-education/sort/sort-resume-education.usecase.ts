import { SortResumeEducationDto, sortResumeEducationDto } from './sort-resume-education.dto';
import { SortResumeEducationPort } from './sort-resume-education.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface ISortResumeEducationUseCase {
	execute(input: SortResumeEducationDto): Promise<Either<string, string>>;
}

export class SortResumeEducationUseCase extends UseCase implements ISortResumeEducationUseCase {
	constructor(private readonly port: SortResumeEducationPort) {
		super();
	}

	async execute(input: SortResumeEducationDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput(sortResumeEducationDto, input);

			Promise.all(validInput.map(education => this.port.sort(education)));

			return this.successResponse('Sort Resume Education has been successfully');
		} catch (error) {
			return this.errorResponse(error, 'Sort Resume Education has failed');
		}
	}
}
