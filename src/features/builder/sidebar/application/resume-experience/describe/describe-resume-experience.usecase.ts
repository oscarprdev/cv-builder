import {
	DescribeResumeExperienceDto,
	describeResumeExperienceDto,
} from './describe-resume-experience.dto';
import { DescribeResumeExperiencePort } from './describe-resume-experience.port';
import { UseCase } from '~/features/shared/application/usecase';
import { ResumeExperienceInfoModel } from '~/features/shared/models/resume.model';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeExperienceUsecase {
	execute(
		input: DescribeResumeExperienceDto
	): Promise<Either<string, ResumeExperienceInfoModel[]>>;
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
	): Promise<Either<string, ResumeExperienceInfoModel[]>> {
		try {
			const validInput = this.parseInput<DescribeResumeExperienceDto>(
				describeResumeExperienceDto,
				input
			);

			const response = await this.ports.describe(validInput);

			if (!response) throw new Error('Resume Experience Info not found');

			return this.successResponse(response);
		} catch (error) {
			return this.errorResponse(error, 'Error describing resume');
		}
	}
}
