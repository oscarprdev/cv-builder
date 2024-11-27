import { EditResumeExperienceDto, editResumeExperienceDto } from './edit-resume-experience.dto';
import { EditResumeExperiencePort } from './edit-resume-experience.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IEditResumeExperienceUsecase {
	execute(input: EditResumeExperienceDto): Promise<Either<string, string>>;
}

export class EditResumeExperienceUsecase extends UseCase implements IEditResumeExperienceUsecase {
	constructor(private readonly port: EditResumeExperiencePort) {
		super();
	}

	async execute(input: EditResumeExperienceDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput(editResumeExperienceDto, input);

			await this.port.edit(validInput);

			return this.successResponse('Edit resume experience success');
		} catch (error) {
			return this.errorResponse(error, 'Edit resume experience failed');
		}
	}
}
