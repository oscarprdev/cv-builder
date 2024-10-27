'use client';

import { ResumeSummaryPresenter } from '../../presenter/resume-summary.presenter';
import React, { useState } from 'react';
import Editor from '~/features/shared/presentation/components/ui/editor/editor';

const FormSummaryClient = ({ summaryInfo }: { summaryInfo: ResumeSummaryPresenter }) => {
	const onEditorChange = (value: string) => {
		console.log(value);
	};
    
	return (
		<form>
			<Editor
				onChange={onEditorChange}
				content={summaryInfo.summary || 'Write a short summary of your experience'}
			/>
		</form>
	);
};

export default FormSummaryClient;
