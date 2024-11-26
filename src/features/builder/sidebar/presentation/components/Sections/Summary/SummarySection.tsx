import SummaryForm from './SummaryForm';
import React from 'react';
import { resumeSummaryPresenter } from '~/features/builder/sidebar/presentation/presenter/resume-summary.presenter';

const SummarySection = async ({ resumeId }: { resumeId: string }) => {
	const response = await resumeSummaryPresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	return <SummaryForm summaryInfo={response} />;
};

const SummarySectionFallback = () => <div>Loading...</div>;

export { SummarySection, SummarySectionFallback };
