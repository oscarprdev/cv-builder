import { EditResumeLanguageDto, editResumeLanguageDto } from './edit-resume-language.dto';
import { EditResumeLanguagePort } from './edit-resume-language.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IEditResumeLanguageUsecase {
	execute(input: EditResumeLanguageDto): Promise<Either<string, string>>;
}

export class EditResumeLanguageUsecase extends UseCase implements IEditResumeLanguageUsecase {
	constructor(private readonly port: EditResumeLanguagePort) {
		super();
	}

	async execute(input: EditResumeLanguageDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput(editResumeLanguageDto, input);

			await this.port.edit(validInput);

			return this.successResponse('Edit resume language success');
		} catch (error) {
			return this.errorResponse(error, 'Edit resume language failed');
		}
	}
}
