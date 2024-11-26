import NavTooltip from '../NavTooltip/NavTooltip';
import {
	Briefcase,
	DraftingCompass,
	GraduationCap,
	Languages,
	Sparkle,
	Text,
	User,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { cn } from '~/lib/utils/cn';

const ICON_SIZE = 20;

const BuilderSidebarNav = ({
	resumeId,
	section,
	opened,
}: {
	resumeId: string;
	section: string;
	opened: boolean;
}) => {
	return (
		<nav
			data-testid="aside-nav"
			className="flex h-full w-fit flex-col items-center justify-start gap-1 bg-background-light">
			<Link href={'/dashboard'} className="flex items-center gap-1 p-1 font-bold italic">
				<Sparkle
					data-testid="aside-header-icon"
					size={ICON_SIZE}
					className={cn(opened ? 'rotate-90' : 'rotate-0', 'text-accent duration-200')}
				/>
			</Link>
			<NavTooltip
				resumeId={resumeId}
				section="basic"
				icon={<User size={ICON_SIZE} />}
				content="Basic information"
				isActive={section === 'basic'}
			/>
			<NavTooltip
				resumeId={resumeId}
				section="summary"
				icon={<Text size={ICON_SIZE} />}
				content="Summary"
				isActive={section === 'summary'}
			/>
			<NavTooltip
				resumeId={resumeId}
				section="experience"
				icon={<Briefcase size={ICON_SIZE} />}
				content="Experience"
				isActive={section === 'experience'}
			/>
			<NavTooltip
				resumeId={resumeId}
				section="education"
				icon={<GraduationCap size={ICON_SIZE} />}
				content="Education"
				isActive={section === 'education'}
			/>
			<NavTooltip
				resumeId={resumeId}
				section="skills"
				icon={<DraftingCompass size={ICON_SIZE} />}
				content="Skills"
				isActive={section === 'skills'}
			/>
			<NavTooltip
				resumeId={resumeId}
				section="languages"
				icon={<Languages size={ICON_SIZE} />}
				content="Languages"
				isActive={section === 'languages'}
			/>
		</nav>
	);
};

export default BuilderSidebarNav;
