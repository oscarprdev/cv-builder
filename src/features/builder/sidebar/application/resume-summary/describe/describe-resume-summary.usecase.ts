import { DescribeResumeSummaryDto, describeResumeSummaryDto } from './describe-resume-summary.dto';
import { DescribeResumeSummaryPort } from './describe-resume-summary.port';
import { UseCase } from '~/features/shared/application/usecase';
import { ResumeSummaryInfoModel } from '~/features/shared/models/resume.model';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeSummaryUseCase {
	execute(
		input: DescribeResumeSummaryDto
	): Promise<Either<string, ResumeSummaryInfoModel | null>>;
}

export class DescribeResumeSummaryUseCase extends UseCase implements IDescribeResumeSummaryUseCase {
	constructor(private readonly ports: DescribeResumeSummaryPort) {
		super();
	}

	async execute(
		input: DescribeResumeSummaryDto
	): Promise<Either<string, ResumeSummaryInfoModel | null>> {
		try {
			const validInput = this.parseInput<DescribeResumeSummaryDto>(
				describeResumeSummaryDto,
				input
			);

			const response = await this.ports.describe(validInput);

			return this.successResponse(response);
		} catch (error: unknown) {
			return this.errorResponse(error, 'Error describing resume summary');
		}
	}
}
