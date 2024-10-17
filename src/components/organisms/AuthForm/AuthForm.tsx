'use client';

import InputPassword from '../../molecules/InputPassword/InputPassword';
import SubmitButton from '../../molecules/SubmitButton/SubmitButton';
import React from 'react';
import { useState } from 'react';
import { Input } from '~/components/atoms/input/input';
import { useActionForm } from '~/hooks/useActionForm';
import { Either } from '~/lib/utils/either';

const AuthForm = ({
	action,
	header,
	subHeader,
	submitText,
	successRoute,
}: {
	action: (formData: FormData) => Promise<Either<string, string>>;
	header: string;
	subHeader: string;
	submitText: string;
	successRoute: string;
}) => {
	const [formValidations, setFormValidations] = useState({
		password: false,
	});

	const { handleSubmit, isPending } = useActionForm({
		action,
		canSubmit: Object.values(formValidations).every(Boolean),
		successRoute,
	});

	const onListenPasswordValidations = (isValid: boolean) =>
		setFormValidations(prev => ({ ...prev, password: isValid }));

	return (
		<form
			action={handleSubmit}
			className="flex w-full animate-fade-up flex-col gap-5 opacity-0">
			<div className="flex flex-col gap-2">
				<h3 className="text-2xl font-bold">{header}</h3>
				<h4 className="text-sm">{subHeader}</h4>
			</div>
			<label htmlFor="email" className="flex flex-col gap-2 text-sm">
				Email
				<Input
					disabled={isPending}
					id="email"
					type="email"
					name="email"
					placeholder="Enter your email"
					required
				/>
			</label>
			<InputPassword
				disabled={isPending}
				onListenPasswordValidations={onListenPasswordValidations}
			/>
			<SubmitButton
				text={submitText}
				isPending={isPending}
				disabled={!Object.values(formValidations).every(Boolean)}
			/>
		</form>
	);
};

export default AuthForm;
