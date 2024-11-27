'use client';

import { ExperienceFormValues, experienceSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import Editor from '~/features/shared/presentation/components/ui/editor/editor';
import { Input } from '~/features/shared/presentation/components/ui/input/input';

type ExperienceFormProps = {
	onSubmit: (values: ExperienceFormValues) => void;
};

const NewExperienceForm = ({ onSubmit }: ExperienceFormProps) => {
	const { handleSubmit, register, formState, setValue } = useForm({
		resolver: zodResolver(experienceSchema),
		defaultValues: {
			company: '',
			position: '',
			startDate: '',
			endDate: '',
			website: '',
			description: '',
		},
	});

	const onEditorChange = (value: string) => setValue('description', value);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<div className="align-start flex w-full gap-5">
				<label
					htmlFor="company"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					Company
					<Input
						{...register('company')}
						disabled={formState.isSubmitting}
						id="company"
						type="text"
						name="company"
						placeholder="Apple"
						required
					/>
					{formState.errors.company && (
						<span className="text-xs text-destructive">
							{formState.errors.company.message}
						</span>
					)}
				</label>
				<label
					htmlFor="position"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					Position
					<Input
						{...register('position')}
						disabled={formState.isSubmitting}
						id="position"
						type="text"
						name="position"
						placeholder="Software Engineer"
						required
					/>
					{formState.errors.position && (
						<span className="text-xs text-destructive">
							{formState.errors.position.message}
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
				htmlFor="website"
				className="relative flex w-full flex-col gap-2 text-sm font-semibold">
				Website
				<Input
					{...register('website')}
					disabled={formState.isSubmitting}
					id="website"
					type="text"
					name="website"
				/>
				{formState.errors.website && (
					<span className="text-xs text-destructive">
						{formState.errors.website.message}
					</span>
				)}
			</label>
			<label
				htmlFor="description"
				className="relative flex w-full flex-col text-sm font-semibold">
				<p className="mb-3">Description</p>
				<Editor onChange={onEditorChange} content={''} />
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
						'Create '
					)}
				</Button>
			</div>
		</form>
	);
};

export default NewExperienceForm;
