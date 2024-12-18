import { SortResumeSkillDto, sortResumeSkillDto } from './sort-resume-skill.dto';
import { SortResumeSkillPort } from './sort-resume-skill.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface ISortResumeSkillUseCase {
	execute(input: SortResumeSkillDto): Promise<Either<string, string>>;
}

export class SortResumeSkillUseCase extends UseCase implements ISortResumeSkillUseCase {
	constructor(private readonly port: SortResumeSkillPort) {
		super();
	}

	async execute(input: SortResumeSkillDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseValue('input', sortResumeSkillDto, input);

			Promise.all(validInput.map(skill => this.port.sort(skill)));

			return this.successResponse('Sort Resume Skill has been successfully');
		} catch (error) {
			return this.errorResponse(error, 'Sort Resume Skill has failed');
		}
	}
}
