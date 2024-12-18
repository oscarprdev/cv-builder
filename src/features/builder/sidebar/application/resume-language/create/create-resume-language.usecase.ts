import { CreateResumeLanguageDto, createResumeLanguageDto } from './create-resume-language.dto';
import { CreateResumeLanguagePort } from './create-resume-language.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface ICreateResumeLanguageUsecase {
	execute(input: CreateResumeLanguageDto): Promise<Either<string, string>>;
}

export class CreateResumeLanguageUsecase extends UseCase implements ICreateResumeLanguageUsecase {
	constructor(private readonly port: CreateResumeLanguagePort) {
		super();
	}

	async execute(input: CreateResumeLanguageDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseValue<CreateResumeLanguageDto>(
				'input',
				createResumeLanguageDto,
				input
			);

			await this.port.create(validInput);

			return this.successResponse('Resume language created successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error creating resume language');
		}
	}
}
