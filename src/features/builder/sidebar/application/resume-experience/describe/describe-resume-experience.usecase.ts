import {
	DescribeResumeExperienceDto,
	DescribeResumeExperienceResponseDto,
	describeResumeExperienceDto,
	describeResumeExperienceResponseDto,
} from './describe-resume-experience.dto';
import { DescribeResumeExperiencePort } from './describe-resume-experience.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeExperienceUsecase {
	execute(
		input: DescribeResumeExperienceDto
	): Promise<Either<string, DescribeResumeExperienceResponseDto>>;
}

export class DescribeResumeExperienceUsecase
	extends UseCase
	implements IDescribeResumeExperienceUsecase
{
	constructor(private readonly ports: DescribeResumeExperiencePort) {
		super();
	}

	async execute(
		input: DescribeResumeExperienceDto
	): Promise<Either<string, DescribeResumeExperienceResponseDto>> {
		try {
			const validInput = this.parseValue<DescribeResumeExperienceDto>(
				'input',
				describeResumeExperienceDto,
				input
			);

			const response = await this.ports.describe(validInput);

			const validOutput = this.parseValue<DescribeResumeExperienceResponseDto>(
				'output',
				describeResumeExperienceResponseDto,
				response
			);

			return this.successResponse(validOutput);
		} catch (error) {
			return this.errorResponse(error, 'Error describing resume');
		}
	}
}
