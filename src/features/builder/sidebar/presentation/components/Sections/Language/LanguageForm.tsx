'use client';

import { LanguageFormValues, languageSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LanguageActionInput } from '~/app/actions/language/shared/types';
import { useBuilderReload } from '~/features/builder/sidebar/presentation/hook/useBuilderReload';
import { languageLevels } from '~/features/builder/sidebar/presentation/presenter/resume-language.presenter';
import { Enums } from '~/features/shared/models/resume.model';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Input } from '~/features/shared/presentation/components/ui/input/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/features/shared/presentation/components/ui/select/select';
import { Either, isError } from '~/lib/utils/either';
import { capitalizeStr } from '~/lib/utils/str';

type LanguageFormProps = {
	resumeId: string;
	languageInfo: LanguageFormValues;
	submitText: string;
	action: (input: LanguageActionInput) => Promise<Either<string, string>>;
};

const LanguageForm = ({ resumeId, languageInfo, submitText, action }: LanguageFormProps) => {
	const { update } = useBuilderReload();

	const { handleSubmit, register, formState, setValue, watch } = useForm({
		resolver: zodResolver(languageSchema),
		defaultValues: languageInfo,
	});

	const onSubmit = async (values: LanguageFormValues) => {
		const response = await action({ ...values, resumeId });
		if (isError(response)) {
			toast.error(response.error);
		} else {
			toast.success(response.success);

			update(resumeId);
		}
	};

	const onLevelSelectChange = (value: Enums.LanguageLevel) => {
		setValue('level', value);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<label
				htmlFor="language"
				className="relative flex w-full flex-col gap-2 text-sm font-semibold">
				Language
				<Input
					{...register('language')}
					disabled={formState.isSubmitting}
					id="language"
					type="text"
					name="language"
					placeholder="English"
					required
				/>
				{formState.errors.language && (
					<span className="text-xs text-destructive">
						{formState.errors.language.message}
					</span>
				)}
			</label>
			<div className="flex w-full items-center gap-5">
				<label
					htmlFor="level"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					Level
					<div className="flex gap-2">
						<Select
							defaultValue={languageInfo.level}
							onValueChange={onLevelSelectChange}
							value={watch('level')}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Level of language" />
							</SelectTrigger>
							<SelectContent>
								{languageLevels.map(level => (
									<SelectItem key={level} value={capitalizeStr(level)}>
										{capitalizeStr(level.toLowerCase())}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					{formState.errors.level && (
						<span className="text-xs text-destructive">
							{formState.errors.level.message}
						</span>
					)}
				</label>
				<label
					htmlFor="certificationUrl"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					Certification URL
					<Input
						{...register('certificationUrl')}
						disabled={formState.isSubmitting}
						id="certificationUrl"
						type="text"
						name="certificationUrl"
						placeholder="https://www.cambridgeenglish.org/"
					/>
					{formState.errors.certificationUrl && (
						<span className="text-xs text-destructive">
							{formState.errors.certificationUrl.message}
						</span>
					)}
				</label>
			</div>

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

export default LanguageForm;
