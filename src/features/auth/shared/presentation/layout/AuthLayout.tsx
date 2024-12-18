import React, { PropsWithChildren } from 'react';
import { Opulento } from 'uvcanvas';

const Auth = ({ children }: PropsWithChildren) => {
	return (
		<main className="flex h-screen w-screen">
			<section className="flex w-full flex-col bg-background px-10 py-20 md:px-20 lg:w-3/5">
				{children}
			</section>
			<section className="bg-backgroundLight relative hidden w-full md:block">
				<div className="absolute left-0 top-0 size-full bg-black/85"></div>
				<Opulento />
			</section>
		</main>
	);
};

export default Auth;
