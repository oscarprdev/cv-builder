'use client';

import { newResumeFormSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createNewResumeAction } from '~/app/actions/create-new-resume.action';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Input } from '~/features/shared/presentation/components/ui/input/input';
import { isError } from '~/lib/utils/either';

const NewResumeForm = () => {
	const router = useRouter();
	const { handleSubmit, formState, register } = useForm({
		resolver: zodResolver(newResumeFormSchema),
		defaultValues: {
			fullname: '',
			headline: '',
			email: '',
			website: '',
			phone: '',
			location: '',
		},
	});

	const onSubmit = async (formValues: z.infer<typeof newResumeFormSchema>) => {
		const response = await createNewResumeAction(formValues);

		if (isError(response)) {
			toast.error(response.error);
		} else {
			toast.success('Resume created successfully');
			router.push(`builder/${response.success.id}`);
		}
	};

	return (
		<form
			data-testid="new-resume-form"
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-6">
			<label
				htmlFor="fullname"
				className="relative flex w-full flex-col gap-2 text-sm font-semibold">
				Fullname
				<Input
					{...register('fullname')}
					disabled={formState.isSubmitting}
					id="fullName"
					type="text"
					name="fullname"
					placeholder="Jhon Doe"
					pattern="^[\w\s\+\-]{1,30}$"
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
						disabled={formState.isSubmitting}
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
					'Create Resume'
				)}
			</Button>
		</form>
	);
};

export default NewResumeForm;
