'use server';

import { errorResponse, successResponse } from '~/lib/utils/either';

export const createNewResumeAction = async (formData: FormData) => {
	try {
		console.log(formData);
		return successResponse('New resume created');
	} catch (error) {
		console.log(error);
		return errorResponse('Error creating new resume');
	}
};
