'use server';

import { signIn } from '~/auth';

export const loginGithubAction = async () => {
	await signIn('github', { redirectTo: '/dashboard' });
};
