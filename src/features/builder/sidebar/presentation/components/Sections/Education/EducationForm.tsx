'use client';

import { useBuilderReload } from '../../../hook/useBuilderReload';
import { EducationFormValues, educationSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EducationActionInput } from '~/app/actions/education/shared/types';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import Editor from '~/features/shared/presentation/components/ui/editor/editor';
import { Input } from '~/features/shared/presentation/components/ui/input/input';
import { Either, isError } from '~/lib/utils/either';

type EducationFormProps = {
	resumeId: string;
	educationInfo: EducationFormValues;
	submitText: string;
	action: (input: EducationActionInput) => Promise<Either<string, string>>;
};

const EducationForm = ({ resumeId, educationInfo, submitText, action }: EducationFormProps) => {
	const { update } = useBuilderReload();

	const { handleSubmit, register, formState, setValue } = useForm({
		resolver: zodResolver(educationSchema),
		defaultValues: educationInfo,
	});

	const onEditorChange = (value: string) => setValue('description', value);

	const onSubmit = async (values: EducationFormValues) => {
		const response = await action({ ...values, resumeId });
		if (isError(response)) {
			toast.error(response.error);
		} else {
			update(resumeId);

			toast.success(response.success);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<div className="align-start flex w-full gap-5">
				<label
					htmlFor="institution"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					Institution
					<Input
						{...register('institution')}
						disabled={formState.isSubmitting}
						id="institution"
						type="text"
						name="institution"
						placeholder="Apple"
						required
					/>
					{formState.errors.institution && (
						<span className="text-xs text-destructive">
							{formState.errors.institution.message}
						</span>
					)}
				</label>
				<label
					htmlFor="study"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					Study
					<Input
						{...register('study')}
						disabled={formState.isSubmitting}
						id="position"
						type="text"
						name="study"
						placeholder="Software Engineer"
						required
					/>
					{formState.errors.study && (
						<span className="text-xs text-destructive">
							{formState.errors.study.message}
						</span>
					)}
				</label>
			</div>

			<div className="align-start flex w-full gap-5">
				<label
					htmlFor="startDate"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					StartDate
					<Input
						{...register('startDate')}
						disabled={formState.isSubmitting}
						id="startDate"
						type="text"
						name="startDate"
						placeholder="March 2023"
						required
					/>
					{formState.errors.startDate && (
						<span className="text-xs text-destructive">
							{formState.errors.startDate.message}
						</span>
					)}
				</label>
				<label
					htmlFor="endDate"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					EndDate
					<Input
						{...register('endDate')}
						disabled={formState.isSubmitting}
						id="endDate"
						type="text"
						name="endDate"
						placeholder="Present"
						required
					/>
					{formState.errors.endDate && (
						<span className="text-xs text-destructive">
							{formState.errors.endDate.message}
						</span>
					)}
				</label>
			</div>
			<label
				htmlFor="description"
				className="relative flex w-full flex-col text-sm font-semibold">
				<p className="mb-3">Description</p>
				<Editor onChange={onEditorChange} content={educationInfo.description} />
				{formState.errors.description && (
					<span className="text-xs text-destructive">
						{formState.errors.description.message}
					</span>
				)}
			</label>
			<div className="mt-2 flex w-full">
				<Button type="submit" disabled={formState.isSubmitting} className="ml-auto">
					{formState.isSubmitting ? (
						<LoaderCircle data-testid="loader-icon" className="animate-spin" />
					) : (
						submitText
					)}
				</Button>
			</div>
		</form>
	);
};

export default EducationForm;
