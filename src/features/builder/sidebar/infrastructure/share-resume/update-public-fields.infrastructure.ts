import { UpdatePublicFieldsPayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface IUpdatePublicFieldsInfrastructure {
	updatePublicFields(input: UpdatePublicFieldsPayload): Promise<void>;
}

export class UpdatePublicFieldsInfrastructure implements IUpdatePublicFieldsInfrastructure {
	async updatePublicFields(input: UpdatePublicFieldsPayload) {
		try {
			await prisma.resumePublicFields.update({
				where: {
					resumeId: input.resumeId,
				},
				data: {
					isNamePublic: input.isNamePublic,
					isEmailPublic: input.isEmailPublic,
					isPhonePublic: input.isPhonePublic,
					isLocationPublic: input.isLocationPublic,
					isWebsitePublic: input.isWebsitePublic,
					isImagePublic: input.isImagePublic,
				},
			});
		} catch {
			throw new Error('Infra Error updating public resume fields');
		}
	}
}
