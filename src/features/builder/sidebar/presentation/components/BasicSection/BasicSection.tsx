import FormBasicClient from './FormBasicClient';
import React from 'react';
import { resumeBasicPresenter } from '~/features/builder/sidebar/presentation/presenter/resume-basic.presenter';

const BasicSection = async ({ resumeId }: { resumeId: string }) => {
	const response = await resumeBasicPresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	return <FormBasicClient basicInfo={response} />;
};

const BasicSectionFallback = () => <div>Loading...</div>;

export { BasicSection, BasicSectionFallback };
