import UpdateTitleSection from '../shared/UpdateTitleSection';
import SummaryForm from './SummaryForm';
import React from 'react';
import { resumeSummaryPresenter } from '~/features/builder/sidebar/presentation/presenter/resume-summary.presenter';
import { Enums } from '~/features/shared/models/resume.model';

const SummarySection = async ({ resumeId }: { resumeId: string }) => {
	const response = await resumeSummaryPresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	return (
		<section className="flex flex-col gap-2">
			<UpdateTitleSection
				title={response.sectionTitle}
				resumeId={resumeId}
				sectionKind={Enums.resumeSection.SUMMARY}
			/>
			<SummaryForm summaryInfo={response} />
		</section>
	);
};

const SummarySectionFallback = () => <div>Loading...</div>;

export { SummarySection, SummarySectionFallback };
