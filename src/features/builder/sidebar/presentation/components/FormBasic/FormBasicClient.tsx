'use client';

import { ResumeBasicPresenter } from '../../presenter/resume-basic.presenter';
import FormBasicImageUrlInput from './FormBasicImageUrlInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateBasicInfoAction } from '~/app/actions/update-basic-info.action';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Input } from '~/features/shared/presentation/components/ui/input/input';
import { isError } from '~/lib/utils/either';

const basicSchema = z.object({
	fullname: z.string({ message: 'Full name is required' }),
	headline: z.string({ message: 'Headline is required' }),
	email: z.string().email({ message: 'Invalid email format' }),
	website: z.string().url({ message: 'Invalid URL format' }),
	phone: z.string({ message: 'Phone number is required' }),
	location: z.string({ message: 'Location is required' }),
	imageUrl: z.string(),
	imageFile: z
		.any()
		.nullable()
		.refine(file => {
			if ((file && !file.size) || !file) return true;

			return (
				file.type === 'image/png' ||
				file.type === 'image/jpeg' ||
				file.type === 'image/webp'
			);
		}),
});

const MAX_FILE_SIZE_MB = 2;

const FormBasicClient = ({ basicInfo }: { basicInfo: ResumeBasicPresenter }) => {
	const { handleSubmit, formState, watch, setValue, register } = useForm({
		resolver: zodResolver(basicSchema),
		defaultValues: {
			fullname: basicInfo.fullName,
			headline: basicInfo.headline,
			email: basicInfo.email,
			website: basicInfo.website,
			phone: basicInfo.phone,
			location: basicInfo.location,
			imageUrl: basicInfo.imageUrl,
			imageFile: null,
		},
	});

	const onSubmit = async (values: z.infer<typeof basicSchema>) => {
		const formData = new FormData();
		Object.keys(values).forEach(key => {
			formData.append(key, values[key as keyof typeof values]);
		});

		const response = await updateBasicInfoAction(formData, basicInfo.resumeId);
		if (isError(response)) {
			toast.error(response.error);
		} else {
			toast.success(response.success);
		}
	};

	const onImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === 'imageFile' && event.target.value) {
			const [file] = Array.from(event.target.files!);

			if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
				return toast.error('Image size should be less than 2MB');
			}

			setValue('imageUrl', URL.createObjectURL(file));
			return;
		}

		setValue('imageUrl', event.target.value);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
			<FormBasicImageUrlInput
				imageUrl={watch('imageUrl')}
				isPending={formState.isSubmitting}
				register={register('imageFile')}
				onImageUrlChange={onImageUrlChange}
			/>
			<label
				htmlFor="fullname"
				className="relative flex w-full flex-col gap-2 text-sm font-semibold">
				Full Name
				<Input
					{...register('fullname')}
					disabled={formState.isSubmitting}
					id="fullname"
					type="text"
					name="fullname"
					placeholder="Jhon Doe"
					pattern="^.{1,30}$"
					required
				/>
				{formState.errors.fullname && (
					<span className="absolute -bottom-5 text-xs text-destructive">
						{formState.errors.fullname.message}
					</span>
				)}
			</label>
			<label
				htmlFor="headline"
				className="relative flex w-full flex-col gap-2 text-sm font-semibold">
				Headline
				<Input
					{...register('headline')}
					disabled={formState.isSubmitting}
					id="headline"
					type="text"
					name="headline"
					placeholder="Software Engineer"
					pattern="^[\w\s\+\-]{1,60}$"
					required
				/>
				{formState.errors.headline && (
					<span className="absolute -bottom-5 text-xs text-destructive">
						{formState.errors.headline.message}
					</span>
				)}
			</label>
			<div className="flex w-full items-center gap-2">
				<label
					htmlFor="email"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					Email
					<Input
						{...register('email')}
						disabled={formState.isSubmitting}
						id="email"
						type="email"
						name="email"
						placeholder="hello@jhondoe.com"
						required
					/>
					{formState.errors.email && (
						<span className="absolute -bottom-5 text-xs text-destructive">
							{formState.errors.email.message}
						</span>
					)}
				</label>
				<label
					htmlFor="website"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					Website
					<Input
						{...register('website')}
						id="website"
						type="url"
						name="website"
						placeholder="https://jhondoe.com"
						required
					/>
					{formState.errors.website && (
						<span className="absolute -bottom-5 text-xs text-destructive">
							{formState.errors.website.message}
						</span>
					)}
				</label>
			</div>
			<div className="mb-2 flex w-full items-center gap-2">
				<label
					htmlFor="phone"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					Phone
					<Input
						{...register('phone')}
						disabled={formState.isSubmitting}
						id="phone"
						type="text"
						pattern="[+]?\d{1,12}"
						name="phone"
						placeholder="688121012"
						required
					/>
					{formState.errors.phone && (
						<span className="absolute -bottom-5 text-xs text-destructive">
							{formState.errors.phone.message}
						</span>
					)}
				</label>
				<label
					htmlFor="location"
					className="relative flex w-full flex-col gap-2 text-sm font-semibold">
					Location
					<Input
						{...register('location')}
						disabled={formState.isSubmitting}
						id="location"
						type="text"
						name="location"
						placeholder="Florida, USA"
						pattern="^[\w\s\+\-,]{1,25}$"
						required
					/>
					{formState.errors.location && (
						<span className="absolute -bottom-5 text-xs text-destructive">
							{formState.errors.location.message}
						</span>
					)}
				</label>
			</div>
			<Button type="submit" disabled={formState.isSubmitting}>
				{formState.isSubmitting ? (
					<LoaderCircle data-testid="loader-icon" className="animate-spin" />
				) : (
					'Update basic info'
				)}
			</Button>
		</form>
	);
};

export default FormBasicClient;
