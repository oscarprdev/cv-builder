'use server';

import prisma from '~/lib/prisma/db';

export const describeResumeAction = async (resumeId: string) => {
	const response = await prisma.resume.findUnique({
		where: {
			id: resumeId,
		},
		include: {
			resumeMeta: true,
			basicInfo: true,
			summaryInfo: true,
			experienceInfo: true,
			educationInfo: true,
			skillInfo: true,
			languageInfo: true,
		},
	});

	return response;
};
