'use client';

import { AuthFormProps, CHARACTERS_ERROR_MESSAGE, LENTGH_ERROR_MESSAGE, authSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck, Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Input } from '~/features/shared/presentation/components/ui/input/input';
import { cn } from '~/lib/utils/cn';
import { isError } from '~/lib/utils/either';

const AuthForm = ({ action, header, subHeader, submitText, successRoute }: AuthFormProps) => {
	const route = useRouter();
	const { handleSubmit, formState, register } = useForm({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof authSchema>) => {
		const response = await action(values);

		if (isError(response)) {
			toast.error(response.error);
		} else {
			toast.success(response.success);
			route.push(successRoute);
		}
	};

	const [passwordVisible, setPasswordVisible] = React.useState(false);
	const onTogglePasswordVissibility = () => setPasswordVisible(!passwordVisible);

	return (
		<form
			data-testid="auth-form"
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-full animate-fade-up flex-col gap-8 opacity-0">
			<div className="flex flex-col gap-2">
				<h3 className="text-2xl font-bold">{header}</h3>
				<h4 className="text-sm">{subHeader}</h4>
			</div>
			<label
				htmlFor="email"
				className="relative flex w-full flex-col gap-2 text-sm font-semibold">
				Email
				<Input
					{...register('email')}
					disabled={formState.isSubmitting}
					id="email"
					name="email"
					placeholder="Enter your email"
					required
				/>
				{formState.errors.email && (
					<span className="absolute -bottom-5 text-xs text-destructive">
						{formState.errors.email.message}
					</span>
				)}
			</label>
			<div>
				<div className="relative">
					<label
						htmlFor="password"
						className="relative flex w-full flex-col gap-2 text-sm font-semibold">
						Password
						<Input
							{...register('password')}
							disabled={formState.isSubmitting}
							id="password"
							type={passwordVisible ? 'text' : 'password'}
							name="password"
							placeholder="Enter your password"
							required
						/>
						<div className="flex flex-col items-start gap-1 text-xs text-muted">
							<div
								className={cn(
									LENTGH_ERROR_MESSAGE !== formState.errors.password?.message
										? 'text-muted'
										: 'text-destructive',
									'flex items-center gap-1'
								)}>
								<CircleCheck data-testid="check-icon" size={14} />
								<p>Must be at least 8 characters</p>
							</div>
							<div
								className={cn(
									CHARACTERS_ERROR_MESSAGE !== formState.errors.password?.message
										? 'text-muted'
										: 'text-destructive',
									'flex items-center gap-1'
								)}>
								<CircleCheck data-testid="check-icon" size={14} />
								<p>Must contain one special character</p>
							</div>
						</div>
						<button
							type="button"
							className="absolute right-2 top-10"
							onClick={onTogglePasswordVissibility}>
							{passwordVisible ? (
								<EyeOff
									data-testid="eye-off-icon"
									size={15}
									className="text-muted hover:text-white"
								/>
							) : (
								<Eye
									data-testid="eye-icon"
									size={15}
									className="text-muted hover:text-white"
								/>
							)}
						</button>
					</label>
				</div>
			</div>
			<Button type="submit" disabled={formState.isSubmitting}>
				{formState.isSubmitting ? (
					<LoaderCircle data-testid="loader-icon" className="animate-spin" />
				) : (
					<>{submitText}</>
				)}
			</Button>
		</form>
	);
};

export default AuthForm;
