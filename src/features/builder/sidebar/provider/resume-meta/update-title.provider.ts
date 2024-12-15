import { UpdateTitleUseCase } from '../../application/resume-meta/update-title/update-title.usecase';
import { UpdateTitleInfrastructure } from '../../infrastructure/resume-meta/update-title.infrastructure';
import { UpdateTitleRepository } from '../../repository/resume-meta/update-title.repository';

export const provideUpdateTitleUsecase = () => {
	const infra = new UpdateTitleInfrastructure();
	const repository = new UpdateTitleRepository(infra);

	return new UpdateTitleUseCase(repository);
};
