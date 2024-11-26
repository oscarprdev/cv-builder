import { PanelLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import SectionsList from '~/features/builder/sidebar/presentation/components/Sections/SectionsList';
import SidebarNav from '~/features/builder/sidebar/presentation/components/Sidebar/SidebarNav';
import { cn } from '~/lib/utils/cn';

type SidebarProps = {
	resumeId: string;
	section: string;
	opened: boolean;
};

const Sidebar = ({ resumeId, section, opened }: SidebarProps) => {
	return (
		<aside
			className={cn(
				opened ? 'w-[480px]' : 'w-[50px]',
				'relative flex h-screen bg-background-light p-2 duration-200'
			)}>
			<Link
				href={`/builder/${resumeId}?section=${section}&opened=${opened ? 'false' : 'true'}`}
				className={cn('group absolute -right-8 top-2 flex w-fit')}>
				<PanelLeft size={22} className="text-muted duration-200 group-hover:text-white" />
			</Link>
			<SidebarNav resumeId={resumeId} section={section} opened={opened} />
			<SectionsList resumeId={resumeId} section={section} opened={opened} />
		</aside>
	);
};

export default Sidebar;
