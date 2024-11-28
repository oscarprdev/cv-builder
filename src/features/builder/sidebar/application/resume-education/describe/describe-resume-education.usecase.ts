import {
	DescribeResumeEducationDto,
	describeResumeEducationDto,
} from './describe-resume-education.dto';
import { DescribeResumeEducationPort } from './describe-resume-education.port';
import { UseCase } from '~/features/shared/application/usecase';
import { ResumeEducationInfoModel } from '~/features/shared/models/resume.model';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeEducationUsecase {
	execute(input: DescribeResumeEducationDto): Promise<Either<string, ResumeEducationInfoModel[]>>;
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
	): Promise<Either<string, ResumeEducationInfoModel[]>> {
		try {
			const validInput = this.parseInput<DescribeResumeEducationDto>(
				describeResumeEducationDto,
				input
			);

			const response = await this.ports.describe(validInput);

			if (!response) throw new Error('Resume Education Info not found');

			return this.successResponse(response);
		} catch (error) {
			return this.errorResponse(error, 'Error describing resume');
		}
	}
}
