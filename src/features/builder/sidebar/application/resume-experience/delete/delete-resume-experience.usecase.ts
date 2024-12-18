import {
	DeleteResumeExperienceDto,
	deleteResumeExperienceDto,
} from './delete-resume-experience.dto';
import { DeleteResumeExperiencePort } from './delete-resume-experience.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IDeleteResumeExperienceUsecase {
	execute(input: DeleteResumeExperienceDto): Promise<Either<string, string>>;
}

export class DeleteResumeExperienceUsecase
	extends UseCase
	implements IDeleteResumeExperienceUsecase
{
	constructor(private readonly port: DeleteResumeExperiencePort) {
		super();
	}

	async execute(input: DeleteResumeExperienceDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseValue<DeleteResumeExperienceDto>(
				'input',
				deleteResumeExperienceDto,
				input
			);

			await this.port.delete(validInput.experienceId);

			return this.successResponse('Experience deleted successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error removing resume experience');
		}
	}
}
