import React, { PropsWithChildren } from 'react';

const Auth = ({ children }: PropsWithChildren) => {
	return (
		<main className="flex h-screen w-screen">
			<section className="flex w-full flex-col bg-background px-10 py-20 md:px-20 lg:w-3/5">
				{children}
			</section>
			<section className="bg-backgroundLight hidden w-full md:block"></section>
		</main>
	);
};

export default Auth;
