import { DeleteResumeDto, deleteResumeDtoSchema } from './delete-resume.dto';
import { DeleteResumePorts } from './delete-resume.ports';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IDeleteResumeUsecase {
	execute(input: DeleteResumeDto): Promise<Either<string, string>>;
}

export class DeleteResumeUsecase extends UseCase implements IDeleteResumeUsecase {
	constructor(private readonly ports: DeleteResumePorts) {
		super();
	}

	async execute(input: DeleteResumeDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseValue('input', deleteResumeDtoSchema, input);

			await this.ports.deleteResume(validInput.resumeId);

			return this.successResponse('Resume deleted successfully');
		} catch (error: unknown) {
			return this.errorResponse(error, 'Error deleting resume');
		}
	}
}
