'use client';

import { useBuilderReload } from '../../../hook/useBuilderReload';
import { PublicFieldsFormValues, publicFieldsSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info, LoaderCircle } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Switch } from '~/features/shared/presentation/components/ui/switch/switch';
import { cn } from '~/lib/utils/cn';
import { Either, isError } from '~/lib/utils/either';

interface PublicFieldsFormProps {
	resumeId: string;
	action: (input: PublicFieldsFormValues) => Promise<Either<string, string>>;
}

const DEFAULT_SHARE_INFO = {
	isNamePublic: false,
	isEmailPublic: false,
	isPhonePublic: false,
	isLocationPublic: false,
	isWebsitePublic: false,
	isImagePublic: false,
};

const PublicFieldsForm = ({ resumeId, action }: PublicFieldsFormProps) => {
	const { update } = useBuilderReload();

	const { handleSubmit, formState, setValue, watch } = useForm({
		resolver: zodResolver(publicFieldsSchema),
		defaultValues: {
			resumeId,
			...DEFAULT_SHARE_INFO,
		},
	});

	const onSubmit = async (values: PublicFieldsFormValues) => {
		const response = await action({ ...values, resumeId });
		if (isError(response)) {
			toast.error(response.error);
		} else {
			toast.success(response.success);
			update(resumeId);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
			<div className="flex items-center gap-2">
				<Info size={12} className="text-muted" />
				<p className="text-xs text-muted">Personal information is private by default.</p>
			</div>

			<div className="flex flex-col gap-5 border border-background-hover p-5">
				<div className="flex w-full items-center justify-between">
					<p className="text-sm">Public fields:</p>
					<Button
						size={'sm'}
						type="submit"
						disabled={formState.isSubmitting}
						className="min-w-16">
						{formState.isSubmitting ? (
							<LoaderCircle data-testid="loader-icon" className="animate-spin" />
						) : (
							'Update'
						)}
					</Button>
				</div>
				<label
					htmlFor="isNamePublic"
					className={cn(
						watch('isNamePublic') ? 'font-semibold' : 'font-normal text-muted',
						'relative flex w-full justify-between gap-2 text-sm'
					)}>
					Name
					<Switch
						checked={watch('isNamePublic')}
						onCheckedChange={e => setValue('isNamePublic', e)}
						disabled={formState.isSubmitting}
						name="isNamePublic"
					/>
				</label>
				<label
					htmlFor="isEmailPublic"
					className={cn(
						watch('isEmailPublic') ? 'font-semibold' : 'font-normal text-muted',
						'relative flex w-full justify-between gap-2 text-sm'
					)}>
					Email
					<Switch
						checked={watch('isEmailPublic')}
						onCheckedChange={e => setValue('isEmailPublic', e)}
						disabled={formState.isSubmitting}
						name="isEmailPublic"
					/>
				</label>
				<label
					htmlFor="isPhonePublic"
					className={cn(
						watch('isPhonePublic') ? 'font-semibold' : 'font-normal text-muted',
						'relative flex w-full justify-between gap-2 text-sm'
					)}>
					Phone
					<Switch
						checked={watch('isPhonePublic')}
						onCheckedChange={e => setValue('isPhonePublic', e)}
						disabled={formState.isSubmitting}
						name="isPhonePublic"
					/>
				</label>
				<label
					htmlFor="isLocationPublic"
					className={cn(
						watch('isLocationPublic') ? 'font-semibold' : 'font-normal text-muted',
						'relative flex w-full justify-between gap-2 text-sm'
					)}>
					Location
					<Switch
						checked={watch('isLocationPublic')}
						onCheckedChange={e => setValue('isLocationPublic', e)}
						disabled={formState.isSubmitting}
						name="isLocationPublic"
					/>
				</label>
				<label
					htmlFor="isWebsitePublic"
					className={cn(
						watch('isWebsitePublic') ? 'font-semibold' : 'font-normal text-muted',
						'relative flex w-full justify-between gap-2 text-sm'
					)}>
					Website
					<Switch
						checked={watch('isWebsitePublic')}
						onCheckedChange={e => setValue('isWebsitePublic', e)}
						disabled={formState.isSubmitting}
						name="isWebsitePublic"
					/>
				</label>
				<label
					htmlFor="isImagePublic"
					className={cn(
						watch('isImagePublic') ? 'font-semibold' : 'font-normal text-muted',
						'relative flex w-full justify-between gap-2 text-sm'
					)}>
					Image
					<Switch
						checked={watch('isImagePublic')}
						onCheckedChange={e => setValue('isImagePublic', e)}
						disabled={formState.isSubmitting}
						name="isImagePublic"
					/>
				</label>
			</div>
		</form>
	);
};

export default PublicFieldsForm;
