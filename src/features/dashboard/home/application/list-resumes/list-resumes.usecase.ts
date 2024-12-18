import { ListResumesDto, listResumesDto } from './list-resumes.dto';
import { ListResumesPort } from './list-resumes.port';
import { UseCase } from '~/features/shared/application/usecase';
import { ResumeModel } from '~/features/shared/models/resume.model';
import { Either } from '~/lib/utils/either';

export interface IListResumesUseCase {
	execute(input: ListResumesDto): Promise<Either<string, ResumeModel[]>>;
}

export class ListResumesUseCase extends UseCase implements IListResumesUseCase {
	constructor(private readonly ports: ListResumesPort) {
		super();
	}

	async execute(input: ListResumesDto): Promise<Either<string, ResumeModel[]>> {
		try {
			const validInput = this.parseValue<ListResumesDto>('input', listResumesDto, input);

			const response = await this.ports.listResumes(validInput);

			return this.successResponse(response);
		} catch (error: unknown) {
			return this.errorResponse(error, 'Error listing resumes');
		}
	}
}
