import { SortResumeExperienceDto, sortResumeExperienceDto } from './sort-resume-experience.dto';
import { SortResumeExperiencePort } from './sort-resume-experience.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface ISortResumeExperienceUseCase {
	execute(input: SortResumeExperienceDto): Promise<Either<string, string>>;
}

export class SortResumeExperienceUseCase extends UseCase implements ISortResumeExperienceUseCase {
	constructor(private readonly port: SortResumeExperiencePort) {
		super();
	}

	async execute(input: SortResumeExperienceDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput(sortResumeExperienceDto, input);

			Promise.all(validInput.map(experience => this.port.sort(experience)));

			return this.successResponse('Sort Resume Experience has been successfully');
		} catch (error) {
			return this.errorResponse(error, 'Sort Resume Experience has failed');
		}
	}
}
