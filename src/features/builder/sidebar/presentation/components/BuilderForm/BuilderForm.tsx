import React, { PropsWithChildren, ReactNode } from 'react';
import { cn } from '~/lib/utils/cn';

const BuilderForm = ({
	title,
	icon,
	opened,
	children,
}: PropsWithChildren<{ title: string; icon: ReactNode; opened: boolean }>) => {
	return (
		<div
			key={title}
			className={cn(
				opened ? 'flex' : 'hidden',
				'w-[380px] animate-fade-right flex-col gap-5 opacity-0'
			)}>
			<header className="flex items-center gap-2">
				{icon}
				<h2 className="text-3xl font-bold">{title}</h2>
			</header>
			{children}
		</div>
	);
};

export default BuilderForm;
