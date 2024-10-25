import { UpdateResumeBasicDto, updateResumeBasicDto } from './update-resume-basic.dto';
import { UpdateResumeBasicPort } from './update-resume-basic.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IUpdateResumeBasicUseCase {
	execute(input: UpdateResumeBasicDto): Promise<Either<string, string>>;
}

export class UpdateResumeBasicUseCase extends UseCase implements IUpdateResumeBasicUseCase {
	constructor(private readonly ports: UpdateResumeBasicPort) {
		super();
	}

	async execute(input: UpdateResumeBasicDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput<UpdateResumeBasicDto>(updateResumeBasicDto, input);

			await this.ports.update(validInput);

			return this.successResponse('Resume basic updated successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error updating resume basic');
		}
	}
}
