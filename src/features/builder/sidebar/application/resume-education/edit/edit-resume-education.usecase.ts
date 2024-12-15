import { EditResumeEducationDto, editResumeEducationDto } from './edit-resume-education.dto';
import { EditResumeEducationPort } from './edit-resume-education.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IEditResumeEducationUsecase {
	execute(input: EditResumeEducationDto): Promise<Either<string, string>>;
}

export class EditResumeEducationUsecase extends UseCase implements IEditResumeEducationUsecase {
	constructor(private readonly port: EditResumeEducationPort) {
		super();
	}

	async execute(input: EditResumeEducationDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseValue('input', editResumeEducationDto, input);

			await this.port.edit(validInput);

			return this.successResponse('Edit resume education success');
		} catch (error) {
			return this.errorResponse(error, 'Edit resume education failed');
		}
	}
}
