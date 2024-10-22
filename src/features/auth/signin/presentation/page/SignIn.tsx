import Link from 'next/link';
import React from 'react';
import { loginAction } from '~/app/actions/login.action';
import AuthForm from '~/features/auth/shared/presentation/components/AuthForm/AuthForm';

const SignInPage = () => {
	return (
		<>
			<AuthForm
				action={loginAction}
				header="Welcome back"
				subHeader="Sign in to your account"
				submitText="Log In"
				successRoute="/dashboard"
			/>
			<label className="mt-5 text-xs text-muted-foreground">
				Don&apos;t have an account?
				<Link href="/signup" className="ml-2 text-muted hover:text-white hover:underline">
					Sign Up
				</Link>
			</label>
		</>
	);
};

export default SignInPage;
