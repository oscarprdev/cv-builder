import { ResumeTheme } from '@prisma/client';
import React from 'react';
import { IListResumesUseCase } from '~/features/dashboard/home/application/list-resumes/list-resumes.usecase';
import ResumeCard from '~/features/dashboard/home/presentation/components/ResumeCard/ResumeCard';
import { isError } from '~/lib/utils/either';

const DashboardResumesList = async ({
	userId,
	usecase,
}: Readonly<{ userId: string; usecase: IListResumesUseCase }>) => {
	const result = await usecase.execute({ userId });

	if (isError(result)) {
		return <ResumeCard theme="error" />;
	}

	return (
		<>
			{result.success.map(resume => (
				<ResumeCard
					key={resume.id}
					theme={resume.resumeMeta?.theme ?? ResumeTheme.DEFAULT}
					basicInfo={resume.basicInfo || undefined}
				/>
			))}
		</>
	);
};

const FallbackDashboardResumesList = () => <ResumeCard theme="fallback" />;

export { DashboardResumesList, FallbackDashboardResumesList };
