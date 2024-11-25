'use client';

import React from 'react';
import InputPassword from '~/features/auth/shared/presentation/components/InputPassword/InputPassword';
import { useAuthForm } from '~/features/auth/shared/presentation/hooks/useAuthForm';
import SubmitButton from '~/features/shared/presentation/components/SubmitButton/SubmitButton';
import { Input } from '~/features/shared/presentation/components/ui/input/input';
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
	const { handleSubmit, onListenPasswordValidations, isPending, formValidations } = useAuthForm({
		successRoute,
		action,
	});

	// const form = useForm();

	return (
		<form
			data-testid="auth-form"
			action={handleSubmit}
			className="flex w-full animate-fade-up flex-col gap-6 opacity-0">
			<div className="flex flex-col gap-2">
				<h3 className="text-2xl font-bold">{header}</h3>
				<h4 className="text-sm">{subHeader}</h4>
			</div>
			<Input
				disabled={isPending}
				id="email"
				label="Email"
				type="email"
				name="email"
				placeholder="Enter your email"
				errorMessage="Invalid email format"
				required
			/>
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
