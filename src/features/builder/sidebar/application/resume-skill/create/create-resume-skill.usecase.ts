import { CreateResumeSkillDto, createResumeSkillDto } from './create-resume-skill.dto';
import { CreateResumeSkillPort } from './create-resume-skill.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface ICreateResumeSkillUsecase {
	execute(input: CreateResumeSkillDto): Promise<Either<string, string>>;
}

export class CreateResumeSkillUsecase extends UseCase implements ICreateResumeSkillUsecase {
	constructor(private readonly port: CreateResumeSkillPort) {
		super();
	}

	async execute(input: CreateResumeSkillDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput<CreateResumeSkillDto>(createResumeSkillDto, input);

			await this.port.create(validInput);

			return this.successResponse('Resume skill created successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error creating resume skill');
		}
	}
}
