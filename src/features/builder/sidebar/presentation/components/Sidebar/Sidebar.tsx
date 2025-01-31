import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import SectionsList from '~/features/builder/sidebar/presentation/components/Sections/SectionsList';
import SidebarNav from '~/features/builder/sidebar/presentation/components/Sidebar/SidebarNav';
import { cn } from '~/lib/utils/cn';

type SidebarProps = {
	resumeId: string;
	section: string;
	opened: boolean;
	reload: number;
};

const Sidebar = ({ resumeId, section, opened, reload }: SidebarProps) => {
	return (
		<aside
			className={cn(
				opened ? 'w-[480px]' : 'w-[50px]',
				'relative flex h-screen bg-background-light p-2 duration-200'
			)}>
			<Link
				href={`/builder/${resumeId}?section=${section}&opened=${opened ? 'false' : 'true'}`}
				className={cn('group absolute -right-8 top-2 z-50 flex w-fit')}>
				{opened ? (
					<PanelLeftClose
						size={22}
						className="text-muted duration-200 group-hover:text-white"
					/>
				) : (
					<PanelRightClose
						size={22}
						className="text-muted duration-200 group-hover:text-white"
					/>
				)}
			</Link>
			<SidebarNav resumeId={resumeId} section={section} opened={opened} />
			<SectionsList resumeId={resumeId} section={section} opened={opened} reload={reload} />
		</aside>
	);
};

export default Sidebar;
