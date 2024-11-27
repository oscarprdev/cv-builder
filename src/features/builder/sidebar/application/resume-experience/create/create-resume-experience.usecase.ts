import {
	CreateResumeExperienceDto,
	createResumeExperienceDto,
} from './create-resume-experience.dto';
import { CreateResumeExperiencePort } from './create-resume-experience.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface ICreateResumeExperienceUsecase {
	execute(input: CreateResumeExperienceDto): Promise<Either<string, string>>;
}

export class CreateResumeExperienceUsecase
	extends UseCase
	implements ICreateResumeExperienceUsecase
{
	constructor(private readonly port: CreateResumeExperiencePort) {
		super();
	}

	async execute(input: CreateResumeExperienceDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput<CreateResumeExperienceDto>(
				createResumeExperienceDto,
				input
			);

			await this.port.create(validInput);

			return this.successResponse('Resume experience created successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error creating resume experience');
		}
	}
}
