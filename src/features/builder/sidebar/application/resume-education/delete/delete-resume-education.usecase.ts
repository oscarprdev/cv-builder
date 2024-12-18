import { DeleteResumeEducationDto, deleteResumeEducationDto } from './delete-resume-education.dto';
import { DeleteResumeEducationPort } from './delete-resume-education.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IDeleteResumeEducationUsecase {
	execute(input: DeleteResumeEducationDto): Promise<Either<string, string>>;
}

export class DeleteResumeEducationUsecase extends UseCase implements IDeleteResumeEducationUsecase {
	constructor(private readonly port: DeleteResumeEducationPort) {
		super();
	}

	async execute(input: DeleteResumeEducationDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseValue<DeleteResumeEducationDto>(
				'input',
				deleteResumeEducationDto,
				input
			);

			await this.port.delete(validInput.educationId);

			return this.successResponse('Education deleted successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error deletting resume education');
		}
	}
}
