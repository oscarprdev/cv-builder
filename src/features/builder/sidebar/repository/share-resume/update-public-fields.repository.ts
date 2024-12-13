import { UpdatePublicFieldsPorts } from '../../application/share-resume/update-publid-fields/update-public-fields.ports';
import { IUpdatePublicFieldsInfrastructure } from '../../infrastructure/share-resume/update-public-fields.infrastructure';
import { UpdatePublicFieldsPayload } from '../../shared/types';

export class UpdatePublicFieldsRepository implements UpdatePublicFieldsPorts {
	constructor(private readonly infra: IUpdatePublicFieldsInfrastructure) {}

	async updatePublicFields(input: UpdatePublicFieldsPayload): Promise<void> {
		await this.infra.updatePublicFields(input);
	}
}
