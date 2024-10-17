import { loginAction } from '../../actions/login.action';
import Link from 'next/link';
import AuthForm from '~/components/organisms/AuthForm/AuthForm';

export default function Home() {
	return (
		<>
			<AuthForm
				action={loginAction}
				header="Welcome back"
				subHeader="Sign in to your account"
				submitText="Log In"
				successRoute="/dashboard"
			/>
			<label className="text-xs text-muted-foreground">
				Don&apos;t have an account?
				<Link href="/signup" className="ml-2 text-muted hover:text-white hover:underline">
					Sign Up
				</Link>
			</label>
		</>
	);
}
