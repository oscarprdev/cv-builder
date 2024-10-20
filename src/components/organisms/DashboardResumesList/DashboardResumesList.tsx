import React from 'react';
import ResumeCard from '~/components/molecules/ResumeCard/ResumeCard';
import { provideListResumesUsecase } from '~/features/resume/list';
import { isError } from '~/lib/utils/either';

const DashboardResumesList = async ({ userId }: Readonly<{ userId: string }>) => {
	const usecase = provideListResumesUsecase();
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
