'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideUpdatePublicFieldsUsecase } from '~/features/builder/sidebar/provider/resume-share/update-public-fields.provider';
import { errorResponse } from '~/lib/utils/either';

export interface UpdatePublicFieldsActionInput {
	resumeId: string;
	isNamePublic: boolean;
	isEmailPublic: boolean;
	isPhonePublic: boolean;
	isLocationPublic: boolean;
	isWebsitePublic: boolean;
	isImagePublic: boolean;
}

export const updatePublicFieldsAction = async (input: UpdatePublicFieldsActionInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideUpdatePublicFieldsUsecase();

	const response = await usecase.execute(input);

	revalidatePath('/builder');

	return response;
};
