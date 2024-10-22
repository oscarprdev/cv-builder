import { CreateResumeDto, createResumeDto } from './create-resume.dto';
import { CreateResumePort } from './create-resume.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface ICreateResumeUseCase {
	execute(input: CreateResumeDto): Promise<Either<string, { id: string }>>;
}

export class CreateResumeUseCase extends UseCase implements ICreateResumeUseCase {
	constructor(private readonly ports: CreateResumePort) {
		super();
	}

	async execute(input: CreateResumeDto): Promise<Either<string, { id: string }>> {
		try {
			const payload = this.parseInput<CreateResumeDto>(createResumeDto, input);

			const result = await this.ports.createResume(payload);

			return this.successResponse({ id: result.resumeId });
		} catch (error: unknown) {
			return this.errorResponse(error, 'Error creating resume');
		}
	}
}
