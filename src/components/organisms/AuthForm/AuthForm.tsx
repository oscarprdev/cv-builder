'use client';

import InputForm from '../../molecules/InputForm/InputForm';
import InputPasswordForm from '../../molecules/InputPasswordForm/InputPasswordForm';
import SubmitButton from '../../molecules/SubmitButton/SubmitButton';
import React, { PropsWithChildren } from 'react';
import { useState } from 'react';
import { useActionForm } from '~/hooks/useActionForm';
import { Either } from '~/lib/utils/either';

const AuthForm = ({
	action,
	header,
	subHeader,
	submitText,
	successRoute,
	children,
}: PropsWithChildren<{
	action: (formData: FormData) => Promise<Either<string, string>>;
	header: string;
	subHeader: string;
	submitText: string;
	successRoute: string;
}>) => {
	const [formValidations, setFormValidations] = useState({
		password: false,
	});

	const { mutate, isPending } = useActionForm({
		action,
		successRoute,
		isValidated: Object.values(formValidations).every(Boolean),
	});

	const onListenPasswordValidations = (isValid: boolean) =>
		setFormValidations(prev => ({ ...prev, password: isValid }));

	return (
		<form action={mutate} className="flex w-full animate-fade-up flex-col gap-5 p-10 opacity-0">
			<div className="flex flex-col gap-2">
				<h3 className="text-2xl font-bold">{header}</h3>
				<h4 className="text-sm">{subHeader}</h4>
			</div>
			<InputForm
				name="email"
				type="email"
				placeholder="Enter your email"
				label="Email"
				disabled={isPending}
			/>
			<InputPasswordForm
				disabled={isPending}
				onListenPasswordValidations={onListenPasswordValidations}
			/>
			<SubmitButton text={submitText} isPending={isPending} />
			{children}
		</form>
	);
};

export default AuthForm;
