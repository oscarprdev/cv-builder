'use server';

import { redirect } from 'next/navigation';
import { signIn } from '~/auth';

export const loginGithubAction = async () => {
	await signIn('github');

	redirect('/dashboard');
};
