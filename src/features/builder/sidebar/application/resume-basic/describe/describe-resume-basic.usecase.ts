import { DescribeResumeBasicDto, describeResumeBasicDto } from './describe-resume-basic.dto';
import { DescribeResumeBasicPort } from './describe-resume-basic.port';
import { UseCase } from '~/features/shared/application/usecase';
import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeBasicUseCase {
	execute(input: DescribeResumeBasicDto): Promise<Either<string, ResumeBasicInfoModel>>;
}

export class DescribeResumeBasicUseCase extends UseCase implements IDescribeResumeBasicUseCase {
	constructor(private readonly ports: DescribeResumeBasicPort) {
		super();
	}

	async execute(input: DescribeResumeBasicDto): Promise<Either<string, ResumeBasicInfoModel>> {
		try {
			const validInput = this.parseValue<DescribeResumeBasicDto>(
				'input',
				describeResumeBasicDto,
				input
			);

			const response = await this.ports.describe(validInput);

			if (!response) throw new Error('Basic Resume Info not found');

			return this.successResponse(response);
		} catch (error: unknown) {
			return this.errorResponse(error, 'Error describing resume basic');
		}
	}
}
