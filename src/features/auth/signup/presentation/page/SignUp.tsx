import Link from 'next/link';
import React from 'react';
import { signupAction } from '~/app/actions/signup.action';
import AuthForm from '~/features/auth/shared/presentation/components/AuthForm/AuthForm';

const SignUpPage = () => {
	return (
		<>
			<AuthForm
				action={signupAction}
				header="Get started"
				subHeader="Create a new account"
				submitText="Sign Up"
				successRoute="/signin"
			/>
			<label className="mt-5 text-xs text-muted-foreground">
				Have an account?
				<Link href="/signin" className="ml-2 text-muted hover:text-white hover:underline">
					Sign In
				</Link>
			</label>
		</>
	);
};

export default SignUpPage;
