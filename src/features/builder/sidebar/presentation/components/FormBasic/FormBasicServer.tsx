import FormBasicClient from './FormBasicClient';
import React from 'react';
import { resumeBasicPresenter } from '~/features/builder/sidebar/presentation/presenter/resume-basic.presenter';

const FormBasicServer = async ({ resumeId }: { resumeId: string }) => {
	const response = await resumeBasicPresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	return <FormBasicClient basicInfo={response} />;
};

const FormBasicServerFallback = () => <div>Loading...</div>;

export { FormBasicServer, FormBasicServerFallback };
