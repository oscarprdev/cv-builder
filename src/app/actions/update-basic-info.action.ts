'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideUpdateResumeBasicUsecase } from '~/features/builder/sidebar/provider/resume-basic/update-resume-basic.provider';
import { errorResponse } from '~/lib/utils/either';

export const updateBasicInfoAction = async (formData: FormData, resumeId: string) => {
	const session = await auth();

	const fullName = formData.get('fullname') as string;
	const headline = formData.get('headline') as string;
	const email = formData.get('email') as string;
	const website = formData.get('website') as string;
	const phone = formData.get('phone') as string;
	const location = formData.get('location') as string;
	const imageFile = formData.get('imageFile') as File;
	const imageUrl = formData.get('imageUrl') as string;

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	if (!fullName || !headline || !email || !website || !phone || !location || !imageUrl) {
		return errorResponse('Invalid payload');
	}

	const usecase = provideUpdateResumeBasicUsecase();
	const response = await usecase.execute({
		resumeId,
		fullName,
		headline,
		email,
		website,
		phone,
		location,
		imageUrl,
		imageFile: imageFile || null,
	});

	revalidatePath('/builder');

	return response;
};
