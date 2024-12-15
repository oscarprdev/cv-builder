import { SortResumeLanguageDto, sortResumeLanguageDto } from './sort-resume-language.dto';
import { SortResumeLanguagePort } from './sort-resume-language.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface ISortResumeLanguageUseCase {
	execute(input: SortResumeLanguageDto): Promise<Either<string, string>>;
}

export class SortResumeLanguageUseCase extends UseCase implements ISortResumeLanguageUseCase {
	constructor(private readonly port: SortResumeLanguagePort) {
		super();
	}

	async execute(input: SortResumeLanguageDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseValue('input', sortResumeLanguageDto, input);

			Promise.all(validInput.map(language => this.port.sort(language)));

			return this.successResponse('Sort Resume Language has been successfully');
		} catch (error) {
			return this.errorResponse(error, 'Sort Resume Language has failed');
		}
	}
}
