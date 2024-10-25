import { resumeBasicPresenter } from '../../presenter/resume-basic.presenter';
import ResumeFormBasicClient from './FormBasicClient';
import React from 'react';

const FormBasicServer = async ({ resumeId }: { resumeId: string }) => {
	const response = await resumeBasicPresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	return <ResumeFormBasicClient basicInfo={response} />;
};

const FormBasicServerFallback = () => <div>Loading...</div>;

export { FormBasicServer, FormBasicServerFallback };
