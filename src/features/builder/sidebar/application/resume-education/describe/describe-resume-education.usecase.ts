import {
	DescribeResumeEducationDto,
	DescribeResumeEducationResponseDto,
	describeResumeEducationDto,
	describeResumeEducationResponseDto,
} from './describe-resume-education.dto';
import { DescribeResumeEducationPort } from './describe-resume-education.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeEducationUsecase {
	execute(
		input: DescribeResumeEducationDto
	): Promise<Either<string, DescribeResumeEducationResponseDto>>;
}

export class DescribeResumeEducationUsecase
	extends UseCase
	implements IDescribeResumeEducationUsecase
{
	constructor(private readonly ports: DescribeResumeEducationPort) {
		super();
	}

	async execute(
		input: DescribeResumeEducationDto
	): Promise<Either<string, DescribeResumeEducationResponseDto>> {
		try {
			const validInput = this.parseValue<DescribeResumeEducationDto>(
				'input',
				describeResumeEducationDto,
				input
			);

			const response = await this.ports.describe(validInput);

			const validOutput = this.parseValue<DescribeResumeEducationResponseDto>(
				'output',
				describeResumeEducationResponseDto,
				response
			);

			return this.successResponse(validOutput);
		} catch (error) {
			return this.errorResponse(error, 'Error describing resume');
		}
	}
}
