import React from 'react';
import ResumeCard from '~/components/molecules/ResumeCard/ResumeCard';
import { IListResumesUseCase } from '~/features/resume/list/application/list-resumes.usecase';
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
					theme={resume.resumeMeta.theme}
					basicInfo={resume.basicInfo}
				/>
			))}
		</>
	);
};

const FallbackDashboardResumesList = () => <ResumeCard theme="fallback" />;

export { DashboardResumesList, FallbackDashboardResumesList };
