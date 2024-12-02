import {
	DescribeResumeLanguageDto,
	describeResumeLanguageDto,
} from './describe-resume-language.dto';
import { DescribeResumeLanguagePort } from './describe-resume-language.port';
import { UseCase } from '~/features/shared/application/usecase';
import { ResumeLanguageInfoModel } from '~/features/shared/models/resume.model';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeLanguageUsecase {
	execute(input: DescribeResumeLanguageDto): Promise<Either<string, ResumeLanguageInfoModel[]>>;
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
	): Promise<Either<string, ResumeLanguageInfoModel[]>> {
		try {
			const validInput = this.parseInput<DescribeResumeLanguageDto>(
				describeResumeLanguageDto,
				input
			);

			const response = await this.ports.describe(validInput);

			if (!response) throw new Error('Resume Language Info not found');

			return this.successResponse(response);
		} catch (error) {
			return this.errorResponse(error, 'Error describing resume');
		}
	}
}
