'use server';

import { auth } from '~/auth';
import { errorResponse, successResponse } from '~/lib/utils/either';

export interface ShareActionInput {
	resumeId: string;
	isNamePublic: boolean;
	isEmailPublic: boolean;
	isPhonePublic: boolean;
	isAddressPublic: boolean;
	isWebsitePublic: boolean;
	isPhotoPublic: boolean;
}

export const shareAction = async (input: ShareActionInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	console.log(input);

	return successResponse('Share resume');
};
