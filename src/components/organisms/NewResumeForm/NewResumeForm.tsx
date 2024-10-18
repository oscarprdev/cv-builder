'use client';

import React, { useMemo, useState } from 'react';
import { createNewResumeAction } from '~/app/actions/create-new-resume.action';
import { Input } from '~/components/atoms/input/input';
import SubmitButton from '~/components/molecules/SubmitButton/SubmitButton';
import { useActionForm } from '~/hooks/useActionForm';

type FormState = {
	fullName: string;
	headline: string;
	email: string;
	website: string;
	phone: string;
	location: string;
};

const initialFormState: FormState = {
	fullName: '',
	headline: '',
	email: '',
	website: '',
	phone: '',
	location: '',
};

const NewResumeForm = () => {
	const [formState, setFormState] = useState<FormState>(initialFormState);
	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const isFormValid = useMemo(() => Object.values(formState).every(Boolean), [formState]);

	const { handleSubmit, isPending } = useActionForm({
		action: createNewResumeAction,
		canSubmit: isFormValid,
	});

	return (
		<form data-testid="new-resume-form" action={handleSubmit} className="flex flex-col gap-6">
			<Input
				disabled={isPending}
				id="fullName"
				label="Full Name"
				type="text"
				name="fullName"
				placeholder="Jhon Doe"
				pattern="^[\w\+\-]{1,30}$"
				errorMessage="Maximum length is 30 characters"
				required
				onChange={onInputChange}
			/>
			<Input
				disabled={isPending}
				id="headline"
				label="Headline"
				type="text"
				name="headline"
				placeholder="Software Engineer"
				pattern="^[\w\+\-]{1,60}$"
				errorMessage="Maximum length is 60 characters"
				required
				onChange={onInputChange}
			/>
			<div className="flex w-full items-center gap-2">
				<Input
					disabled={isPending}
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
					id="location"
					label="Location"
					type="text"
					name="location"
					placeholder="Florida, USA"
					pattern="^[\w\+\-]{1,25}$"
					errorMessage="Maximum length is 25 characters"
					required
					onChange={onInputChange}
				/>
			</div>
			<SubmitButton text="Create Resume" isPending={isPending} disabled={!isFormValid} />
		</form>
	);
};

export default NewResumeForm;
