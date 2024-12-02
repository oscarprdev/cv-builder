import { EditResumeSkillDto, editResumeSkillDto } from './edit-resume-skill.dto';
import { EditResumeSkillPort } from './edit-resume-skill.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IEditResumeSkillUsecase {
	execute(input: EditResumeSkillDto): Promise<Either<string, string>>;
}

export class EditResumeSkillUsecase extends UseCase implements IEditResumeSkillUsecase {
	constructor(private readonly port: EditResumeSkillPort) {
		super();
	}

	async execute(input: EditResumeSkillDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput(editResumeSkillDto, input);

			await this.port.edit(validInput);

			return this.successResponse('Edit resume skill success');
		} catch (error) {
			return this.errorResponse(error, 'Edit resume skill failed');
		}
	}
}
