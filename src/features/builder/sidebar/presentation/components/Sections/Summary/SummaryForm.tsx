'use client';

import { ResumeSummaryPresenter } from '../../../presenter/resume-summary.presenter';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateSummaryAction } from '~/app/actions/summary/update-summary.action';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import Editor from '~/features/shared/presentation/components/ui/editor/editor';
import { isError } from '~/lib/utils/either';

const summarySchema = z.object({
	summary: z.string().min(1, { message: 'Summary is required' }),
});

const SummaryForm = ({ summaryInfo }: { summaryInfo: ResumeSummaryPresenter }) => {
	const [formSubmitting, setFormSubmitting] = React.useState(false);
	const { setValue, getValues } = useForm({
		resolver: zodResolver(summarySchema),
		defaultValues: {
			summary: summaryInfo.summary,
		},
	});

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormSubmitting(true);

		const values = getValues();
		const response = await updateSummaryAction({
			summary: values.summary,
			resumeId: summaryInfo.resumeId,
		});

		if (isError(response)) {
			toast.error(response.error);
		} else {
			toast.success('Summary updated successfully');
		}

		setFormSubmitting(false);
	};

	const onInputChange = (value: string) => {
		setValue('summary', value);
	};

	return (
		<form onSubmit={onSubmit} className="flex w-full flex-col">
			<Editor
				onChange={onInputChange}
				content={summaryInfo.summary || 'Write a short summary of your experience'}
			/>
			<Button type="submit" disabled={formSubmitting} className="mt-5">
				{formSubmitting ? (
					<LoaderCircle data-testid="loader-icon" className="animate-spin" />
				) : (
					'Update summary'
				)}
			</Button>
		</form>
	);
};

export default SummaryForm;
