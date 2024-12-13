import { UpdatePublicFieldsUsecase } from '../../application/share-resume/update-publid-fields/update-public-fields.usecase';
import { UpdatePublicFieldsInfrastructure } from '../../infrastructure/share-resume/update-public-fields.infrastructure';
import { UpdatePublicFieldsRepository } from '../../repository/share-resume/update-public-fields.repository';

export const provideUpdatePublicFieldsUsecase = () => {
	const infra = new UpdatePublicFieldsInfrastructure();
	const repository = new UpdatePublicFieldsRepository(infra);

	return new UpdatePublicFieldsUsecase(repository);
};
