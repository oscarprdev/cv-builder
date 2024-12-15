import {
	DescribeResumeSummaryDto,
	DescribeResumeSummaryResponseDto,
	describeResumeSummaryDto,
	describeResumeSummaryResponseDto,
} from './describe-resume-summary.dto';
import { DescribeResumeSummaryPort } from './describe-resume-summary.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeSummaryUseCase {
	execute(
		input: DescribeResumeSummaryDto
	): Promise<Either<string, DescribeResumeSummaryResponseDto>>;
}

export class DescribeResumeSummaryUseCase extends UseCase implements IDescribeResumeSummaryUseCase {
	constructor(private readonly ports: DescribeResumeSummaryPort) {
		super();
	}

	async execute(
		input: DescribeResumeSummaryDto
	): Promise<Either<string, DescribeResumeSummaryResponseDto>> {
		try {
			const validInput = this.parseValue<DescribeResumeSummaryDto>(
				'input',
				describeResumeSummaryDto,
				input
			);

			const response = await this.ports.describe(validInput);

			const validOutput = this.parseValue<DescribeResumeSummaryResponseDto>(
				'output',
				describeResumeSummaryResponseDto,
				response
			);

			return this.successResponse(validOutput);
		} catch (error: unknown) {
			return this.errorResponse(error, 'Error describing resume summary');
		}
	}
}
