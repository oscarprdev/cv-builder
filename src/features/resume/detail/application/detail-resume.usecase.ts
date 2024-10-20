import { DetailResumeDto, detaildResumeDto } from './detail-resume.dto';
import { DetailResumePort } from './detail-resume.port';
import { UseCase } from '~/features/shared/application/usecase';
import { ResumeModel } from '~/features/shared/models/resume.model';
import { Either } from '~/lib/utils/either';

export interface IDetailResumeUseCase {
	execute(input: DetailResumeDto): Promise<Either<string, ResumeModel>>;
}

export class DetailResumeUseCase extends UseCase implements IDetailResumeUseCase {
	constructor(private readonly ports: DetailResumePort) {
		super();
	}

	async execute(input: DetailResumeDto): Promise<Either<string, ResumeModel>> {
		try {
			const validInput = this.parseInput<DetailResumeDto>(detaildResumeDto, input);

			const response = await this.ports.retrieveResume(validInput);

			return this.successResponse(response);
		} catch (error: unknown) {
			return this.errorResponse(error, 'Error retrieving resume detail');
		}
	}
}
