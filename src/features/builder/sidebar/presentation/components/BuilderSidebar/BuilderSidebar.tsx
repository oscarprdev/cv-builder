import BuilderSidebarNav from '../BuilderSidebarNav/BuilderSidebarNav';
import BuilderSidebarSectionsList from '../BuilderSidebarSectionsList/BuilderSidebarSectionsList';
import { PanelLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { cn } from '~/lib/utils/cn';

const BuilderSidebar = ({
	resumeId,
	section,
	opened,
}: {
	resumeId: string;
	section: string;
	opened: boolean;
}) => {
	return (
		<aside
			className={cn(
				opened ? 'w-[450px]' : 'w-[50px]',
				'relative flex h-screen bg-background-light p-2 duration-200'
			)}>
			<Link
				href={`/builder/${resumeId}?section=${section}&opened=${opened ? 'false' : 'true'}`}
				className={cn('group absolute -right-8 top-2 flex w-fit')}>
				<PanelLeft size={22} className="text-muted duration-200 group-hover:text-white" />
			</Link>
			<BuilderSidebarNav resumeId={resumeId} section={section} opened={opened} />
			<BuilderSidebarSectionsList resumeId={resumeId} section={section} opened={opened} />
		</aside>
	);
};

export default BuilderSidebar;
