import { DescribeResumeSkillDto, describeResumeSkillDto } from './describe-resume-skill.dto';
import { DescribeResumeSkillPort } from './describe-resume-skill.port';
import { UseCase } from '~/features/shared/application/usecase';
import { ResumeSkillInfoModel } from '~/features/shared/models/resume.model';
import { Either } from '~/lib/utils/either';

export interface IDescribeResumeSkillUsecase {
	execute(input: DescribeResumeSkillDto): Promise<Either<string, ResumeSkillInfoModel[]>>;
}

export class DescribeResumeSkillUsecase extends UseCase implements IDescribeResumeSkillUsecase {
	constructor(private readonly ports: DescribeResumeSkillPort) {
		super();
	}

	async execute(input: DescribeResumeSkillDto): Promise<Either<string, ResumeSkillInfoModel[]>> {
		try {
			const validInput = this.parseInput<DescribeResumeSkillDto>(
				describeResumeSkillDto,
				input
			);

			const response = await this.ports.describe(validInput);

			if (!response) throw new Error('Resume Skill Info not found');

			return this.successResponse(response);
		} catch (error) {
			return this.errorResponse(error, 'Error describing resume');
		}
	}
}
