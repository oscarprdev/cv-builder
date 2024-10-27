import FormSummaryClient from './FormSummaryClient';
import React from 'react';
import { resumeSummaryPresenter } from '~/features/builder/sidebar/presentation/presenter/resume-summary.presenter';

const FormSummaryServer = async ({ resumeId }: { resumeId: string }) => {
	const response = await resumeSummaryPresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	return <FormSummaryClient summaryInfo={response} />;
};

const FormSummaryServerFallback = () => <div>Loading...</div>;

export { FormSummaryServer, FormSummaryServerFallback };
