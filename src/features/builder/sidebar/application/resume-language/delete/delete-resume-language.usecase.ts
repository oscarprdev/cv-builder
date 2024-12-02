import { DeleteResumeLanguageDto, deleteResumeLanguageDto } from './delete-resume-language.dto';
import { DeleteResumeLanguagePort } from './delete-resume-language.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IDeleteResumeLanguageUsecase {
	execute(input: DeleteResumeLanguageDto): Promise<Either<string, string>>;
}

export class DeleteResumeLanguageUsecase extends UseCase implements IDeleteResumeLanguageUsecase {
	constructor(private readonly port: DeleteResumeLanguagePort) {
		super();
	}

	async execute(input: DeleteResumeLanguageDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput<DeleteResumeLanguageDto>(
				deleteResumeLanguageDto,
				input
			);

			await this.port.delete(validInput.languageId);

			return this.successResponse('Language deleted successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error removing resume language');
		}
	}
}
