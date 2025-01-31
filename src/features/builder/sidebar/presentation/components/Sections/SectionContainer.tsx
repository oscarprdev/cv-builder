'use client';

import { motion } from 'framer-motion';
import React, { PropsWithChildren, ReactNode } from 'react';
import { cn } from '~/lib/utils/cn';

type SectionContainerProps = {
	title: string;
	icon: ReactNode;
	opened: boolean;
};

const SectionContainer = ({
	title,
	icon,
	opened,
	children,
}: PropsWithChildren<SectionContainerProps>) => {
	return (
		<motion.section
			key={title}
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -50 }}
			className={cn(opened ? 'flex' : 'hidden', 'w-[400px] flex-col gap-5')}>
			<header className="flex items-center gap-2">
				{icon}
				<h2 className="text-3xl font-bold">{title}</h2>
			</header>
			{children}
		</motion.section>
	);
};

export default SectionContainer;
