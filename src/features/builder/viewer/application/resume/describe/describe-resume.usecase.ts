import { DescribeResumeDto, describeResumeDto } from './describe-resume.dto';
import { DescribeResumePort } from './describe-resume.port';
import { UseCase } from '~/features/shared/application/usecase';
import { ResumeModel } from '~/features/shared/models/resume.model';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeUseCase {
	execute(input: DescribeResumeDto): Promise<Either<string, ResumeModel>>;
}

export class DescribeResumeUseCase extends UseCase implements IDescribeResumeUseCase {
	constructor(private readonly port: DescribeResumePort) {
		super();
	}

	async execute(input: DescribeResumeDto): Promise<Either<string, ResumeModel>> {
		try {
			const validInput = this.parseInput(describeResumeDto, input);

			const response = await this.port.describe(validInput.resumeId);
			if (!response) throw new Error('Resume not found');

			return this.successResponse(response);
		} catch (error) {
			return this.errorResponse(error, 'Error while describing resume');
		}
	}
}
