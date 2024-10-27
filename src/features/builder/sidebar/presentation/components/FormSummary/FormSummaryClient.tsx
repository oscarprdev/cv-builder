'use client';

import { useFormSummary } from '../../hooks/useFormSummary';
import { ResumeSummaryPresenter } from '../../presenter/resume-summary.presenter';
import React from 'react';
import { updateSummaryAction } from '~/app/actions/update-summary.action';
import SubmitButton from '~/features/shared/presentation/components/SubmitButton/SubmitButton';
import Editor from '~/features/shared/presentation/components/ui/editor/editor';

const FormSummaryClient = ({ summaryInfo }: { summaryInfo: ResumeSummaryPresenter }) => {
	const { isPending, canSubmit, handleSubmit, onInputChange } = useFormSummary({
		defaultValues: summaryInfo,
		action: updateSummaryAction,
	});

	return (
		<form action={handleSubmit} className="flex w-full flex-col gap-5">
			<Editor
				onChange={onInputChange}
				content={summaryInfo.summary || 'Write a short summary of your experience'}
			/>
			<SubmitButton disabled={!canSubmit} text="Update summary" isPending={isPending} />
		</form>
	);
};

export default FormSummaryClient;
