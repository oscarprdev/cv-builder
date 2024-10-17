import Link from 'next/link';
import { signupAction } from '~/app/actions/signup.action';
import AuthForm from '~/components/organisms/AuthForm/AuthForm';

export default function Home() {
	return (
		<>
			<AuthForm
				action={signupAction}
				header="Get started"
				subHeader="Create a new account"
				submitText="Sign Up"
				successRoute="/signin"
			/>
			<label className="text-xs text-muted-foreground">
				Have an account?
				<Link href="/signin" className="ml-2 text-muted hover:text-white hover:underline">
					Sign In
				</Link>
			</label>
		</>
	);
}
