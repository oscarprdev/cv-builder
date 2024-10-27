import { UpdateResumeSummaryDto, updateResumeSummaryDto } from './update-resume-summary.dto';
import { UpdateResumeSummaryPort } from './update-resume.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IUpdateResumeSummaryUsecase {
	execute(payload: UpdateResumeSummaryDto): Promise<Either<string, string>>;
}

export class UpdateResumeSummaryUsecase extends UseCase implements IUpdateResumeSummaryUsecase {
	constructor(private readonly ports: UpdateResumeSummaryPort) {
		super();
	}

	async execute(payload: UpdateResumeSummaryDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput(updateResumeSummaryDto, payload);

			await this.ports.update(validInput);

			return this.successResponse('Resume summary updated successfully');
		} catch (error) {
			return this.errorResponse(error, 'Update resume summary failed');
		}
	}
}
