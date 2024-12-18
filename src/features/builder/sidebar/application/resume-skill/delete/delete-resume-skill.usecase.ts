import { DeleteResumeSkillDto, deleteResumeSkillDto } from './delete-resume-skill.dto';
import { DeleteResumeSkillPort } from './delete-resume-skill.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IDeleteResumeSkillUsecase {
	execute(input: DeleteResumeSkillDto): Promise<Either<string, string>>;
}

export class DeleteResumeSkillUsecase extends UseCase implements IDeleteResumeSkillUsecase {
	constructor(private readonly port: DeleteResumeSkillPort) {
		super();
	}

	async execute(input: DeleteResumeSkillDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseValue<DeleteResumeSkillDto>(
				'input',
				deleteResumeSkillDto,
				input
			);

			await this.port.delete(validInput.skillId);

			return this.successResponse('Skill deleted successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error removing resume skill');
		}
	}
}
