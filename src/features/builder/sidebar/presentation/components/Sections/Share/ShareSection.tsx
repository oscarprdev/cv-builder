'use client';

import { ShareFormValues, shareSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Switch } from '~/features/shared/presentation/components/ui/switch/switch';
import { cn } from '~/lib/utils/cn';
import { Either, isError } from '~/lib/utils/either';

interface ShareSectionProps {
	resumeId: string;
	action: (input: ShareFormValues) => Promise<Either<string, string>>;
}

const DEFAULT_SHARE_INFO = {
	isNamePublic: false,
	isEmailPublic: false,
	isPhonePublic: false,
	isAddressPublic: false,
	isWebsitePublic: false,
	isPhotoPublic: false,
};

const ShareSection = ({ resumeId, action }: ShareSectionProps) => {
	const { handleSubmit, formState, setValue, watch } = useForm({
		resolver: zodResolver(shareSchema),
		defaultValues: {
			resumeId,
			...DEFAULT_SHARE_INFO,
		},
	});

	const onSubmit = async (values: ShareFormValues) => {
		const response = await action({ ...values, resumeId });
		if (isError(response)) {
			toast.error(response.error);
		} else {
			toast.success(response.success);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
			<div className="flex items-center gap-2">
				<Info size={12} className="text-muted" />
				<p className="text-xs text-muted">Personal information is private by default.</p>
			</div>

			<div className="flex flex-col gap-5 border border-background-hover p-5">
				<p className="text-sm">Public fields:</p>
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
					htmlFor="isAddressPublic"
					className={cn(
						watch('isAddressPublic') ? 'font-semibold' : 'font-normal text-muted',
						'relative flex w-full justify-between gap-2 text-sm'
					)}>
					Address
					<Switch
						checked={watch('isAddressPublic')}
						onCheckedChange={e => setValue('isAddressPublic', e)}
						disabled={formState.isSubmitting}
						name="isAddressPublic"
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
					htmlFor="isPhotoPublic"
					className={cn(
						watch('isPhotoPublic') ? 'font-semibold' : 'font-normal text-muted',
						'relative flex w-full justify-between gap-2 text-sm'
					)}>
					Photo
					<Switch
						checked={watch('isPhotoPublic')}
						onCheckedChange={e => setValue('isPhotoPublic', e)}
						disabled={formState.isSubmitting}
						name="isPhotoPublic"
					/>
				</label>
			</div>

			<Button type="submit" disabled={formState.isSubmitting} className="mt-5">
				Publish resume
			</Button>
		</form>
	);
};

export default ShareSection;
