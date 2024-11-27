import {
	RemoveResumeExperienceDto,
	removeResumeExperienceDto,
} from './remove-resume-experience.dto';
import { RemoveResumeExperiencePort } from './remove-resume-experience.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IRemoveResumeExperienceUsecase {
	execute(input: RemoveResumeExperienceDto): Promise<Either<string, string>>;
}

export class RemoveResumeExperienceUsecase
	extends UseCase
	implements IRemoveResumeExperienceUsecase
{
	constructor(private readonly port: RemoveResumeExperiencePort) {
		super();
	}

	async execute(input: RemoveResumeExperienceDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput<RemoveResumeExperienceDto>(
				removeResumeExperienceDto,
				input
			);

			await this.port.remove(validInput.experienceId);

			return this.successResponse('Experience removed successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error removing resume experience');
		}
	}
}
