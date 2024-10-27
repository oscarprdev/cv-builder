'use client';

import { useFormBasic } from '../../hooks/useFormBasic';
import { ResumeBasicPresenter } from '../../presenter/resume-basic.presenter';
import FormBasicImageUrlInput from './FormBasicImageUrlInput';
import React from 'react';
import { updateBasicInfoAction } from '~/app/actions/update-basic-info.action';
import SubmitButton from '~/features/shared/presentation/components/SubmitButton/SubmitButton';
import { Input } from '~/features/shared/presentation/components/ui/input/input';

const FormBasicClient = ({ basicInfo }: { basicInfo: ResumeBasicPresenter }) => {
	const { formState, isPending, isFormValid, onInputChange, handleSubmit } = useFormBasic({
		defaultValues: basicInfo,
		action: (formData: FormData) =>
			updateBasicInfoAction(formData, basicInfo.resumeId, formState.imageUrl),
	});

	return (
		<form action={handleSubmit} className="flex w-full flex-col gap-5">
			<FormBasicImageUrlInput
				imageUrl={formState.imageUrl}
				isPending={isPending}
				onInputChange={onInputChange}
			/>
			<Input
				disabled={isPending}
				value={formState.fullName}
				id="fullName"
				label="Full Name"
				type="text"
				name="fullName"
				placeholder="Jhon Doe"
				pattern="^.{1,30}$"
				errorMessage="Maximum length is 30 characters"
				required
				onChange={onInputChange}
			/>
			<Input
				disabled={isPending}
				value={formState.headline}
				id="headline"
				label="Headline"
				type="text"
				name="headline"
				placeholder="Software Engineer"
				pattern="^[\w\s\+\-]{1,60}$"
				errorMessage="Maximum length is 60 characters"
				required
				onChange={onInputChange}
			/>
			<div className="flex w-full items-center gap-2">
				<Input
					disabled={isPending}
					value={formState.email}
					id="email"
					label="Email"
					type="email"
					name="email"
					placeholder="hello@jhondoe.com"
					errorMessage="Invalid email format"
					required
					onChange={onInputChange}
				/>
				<Input
					disabled={isPending}
					value={formState.website}
					id="website"
					label="Website"
					type="url"
					name="website"
					placeholder="https://jhondoe.com"
					errorMessage="Invalid URL format"
					required
					onChange={onInputChange}
				/>
			</div>
			<div className="mb-2 flex w-full items-center gap-2">
				<Input
					disabled={isPending}
					value={formState.phone}
					id="phone"
					label="Phone"
					type="text"
					pattern="[+]?\d{1,12}"
					name="phone"
					placeholder="688121012"
					errorMessage="Invalid phone number format"
					required
					onChange={onInputChange}
				/>
				<Input
					disabled={isPending}
					value={formState.location}
					id="location"
					label="Location"
					type="text"
					name="location"
					placeholder="Florida, USA"
					pattern="^[\w\s\+\-,]{1,25}$"
					errorMessage="Maximum length is 25 characters"
					required
					onChange={onInputChange}
				/>
			</div>
			<SubmitButton text="Update basic info" isPending={isPending} disabled={!isFormValid} />
		</form>
	);
};

export default FormBasicClient;
