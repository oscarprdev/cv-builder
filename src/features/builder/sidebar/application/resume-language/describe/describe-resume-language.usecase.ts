import {
	DescribeResumeLanguageDto,
	DescribeResumeLanguageResponseDto,
	describeResumeLanguageDto,
	describeResumeLanguageResponseDto,
} from './describe-resume-language.dto';
import { DescribeResumeLanguagePort } from './describe-resume-language.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeLanguageUsecase {
	execute(
		input: DescribeResumeLanguageDto
	): Promise<Either<string, DescribeResumeLanguageResponseDto>>;
}

export class DescribeResumeLanguageUsecase
	extends UseCase
	implements IDescribeResumeLanguageUsecase
{
	constructor(private readonly ports: DescribeResumeLanguagePort) {
		super();
	}

	async execute(
		input: DescribeResumeLanguageDto
	): Promise<Either<string, DescribeResumeLanguageResponseDto>> {
		try {
			const validInput = this.parseValue<DescribeResumeLanguageDto>(
				'input',
				describeResumeLanguageDto,
				input
			);

			const response = await this.ports.describe(validInput);

			const validOutput = this.parseValue<DescribeResumeLanguageResponseDto>(
				'output',
				describeResumeLanguageResponseDto,
				response
			);

			return this.successResponse(validOutput);
		} catch (error) {
			return this.errorResponse(error, 'Error describing resume');
		}
	}
}
