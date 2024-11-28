import { CreateResumeEducationDto, createResumeEducationDto } from './create-resume-education.dto';
import { CreateResumeEducationPort } from './create-resume-education.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface ICreateResumeEducationUsecase {
	execute(input: CreateResumeEducationDto): Promise<Either<string, string>>;
}

export class CreateResumeEducationUsecase extends UseCase implements ICreateResumeEducationUsecase {
	constructor(private readonly port: CreateResumeEducationPort) {
		super();
	}

	async execute(input: CreateResumeEducationDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput<CreateResumeEducationDto>(
				createResumeEducationDto,
				input
			);

			await this.port.create(validInput);

			return this.successResponse('Resume education created successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error creating resume education');
		}
	}
}
