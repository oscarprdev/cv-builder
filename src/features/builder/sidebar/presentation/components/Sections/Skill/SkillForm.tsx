'use client';

import { useBuilderReload } from '../../../hooks/useBuilderReload';
import { SkillFormValues, skillSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SkillActionInput } from '~/app/actions/skill/shared/types';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Input } from '~/features/shared/presentation/components/ui/input/input';
import { Slider } from '~/features/shared/presentation/components/ui/slider/slider';
import { Either, isError } from '~/lib/utils/either';

type SkillFormProps = {
	resumeId: string;
	skillInfo: SkillFormValues;
	submitText: string;
	action: (input: SkillActionInput) => Promise<Either<string, string>>;
};

const SkillForm = ({ resumeId, skillInfo, submitText, action }: SkillFormProps) => {
	const { update } = useBuilderReload();

	const { handleSubmit, register, formState, watch, setValue } = useForm({
		resolver: zodResolver(skillSchema),
		defaultValues: skillInfo,
	});

	const onSubmit = async (values: SkillFormValues) => {
		const response = await action({ ...values, resumeId });
		if (isError(response)) {
			toast.error(response.error);
		} else {
			toast.success(response.success);

			update(resumeId);
		}
	};

	const onSliderChange = (event: React.FormEvent<HTMLInputElement>) => {
		const target = event.target;
		if (target instanceof HTMLInputElement) {
			setValue('level', Number(target.value));
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<label
				htmlFor="name"
				className="relative flex w-full flex-col gap-2 text-sm font-semibold">
				Name
				<Input
					{...register('name')}
					disabled={formState.isSubmitting}
					id="name"
					type="text"
					name="name"
					placeholder="Javascript"
					required
				/>
				{formState.errors.name && (
					<span className="text-xs text-destructive">
						{formState.errors.name.message}
					</span>
				)}
			</label>
			<label
				htmlFor="level"
				className="relative mb-5 flex w-full flex-col gap-2 text-sm font-semibold">
				Level
				<div className="align-center flex gap-2">
					<Slider
						{...register('level')}
						max={5}
						min={1}
						step={1}
						id="level"
						name="level"
						onChange={onSliderChange}
						defaultValue={[skillInfo.level]}
						disabled={formState.isSubmitting}
					/>
					<p>{watch('level')}</p>
				</div>
				{formState.errors.level && (
					<span className="text-xs text-destructive">
						{formState.errors.level.message}
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

export default SkillForm;
