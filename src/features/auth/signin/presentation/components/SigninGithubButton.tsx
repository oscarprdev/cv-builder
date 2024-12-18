'use client';

import { IconBrandGithub } from '@tabler/icons-react';
import React from 'react';
import { loginGithubAction } from '~/app/actions/login-github.action';
import { Button } from '~/features/shared/presentation/components/ui/button/button';

const SigninGithubButton = () => {
	const onGithubSigninClick = async () => await loginGithubAction();
	return (
		<Button
			className="mt-5 flex items-center gap-2 border"
			variant={'ghost'}
			onClick={onGithubSigninClick}>
			Github
			<IconBrandGithub size={18} />
		</Button>
	);
};

export default SigninGithubButton;
