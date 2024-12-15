import {
	DescribeResumeSkillDto,
	DescribeResumeSkillResponseDto,
	describeResumeSkillDto,
	describeResumeSkillResponseDto,
} from './describe-resume-skill.dto';
import { DescribeResumeSkillPort } from './describe-resume-skill.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeSkillUsecase {
	execute(input: DescribeResumeSkillDto): Promise<Either<string, DescribeResumeSkillResponseDto>>;
}

export class DescribeResumeSkillUsecase extends UseCase implements IDescribeResumeSkillUsecase {
	constructor(private readonly ports: DescribeResumeSkillPort) {
		super();
	}

	async execute(
		input: DescribeResumeSkillDto
	): Promise<Either<string, DescribeResumeSkillResponseDto>> {
		try {
			const validInput = this.parseValue<DescribeResumeSkillDto>(
				'input',
				describeResumeSkillDto,
				input
			);

			const response = await this.ports.describe(validInput);

			const validOutput = this.parseValue<DescribeResumeSkillResponseDto>(
				'output',
				describeResumeSkillResponseDto,
				response
			);

			return this.successResponse(validOutput);
		} catch (error) {
			return this.errorResponse(error, 'Error describing resume');
		}
	}
}
