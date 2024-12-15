import {
	Briefcase,
	DraftingCompass,
	GraduationCap,
	Languages,
	Palette,
	Settings,
	Sparkle,
	Text,
	User,
} from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '~/features/shared/presentation/components/ui/tooltip/tooltip';
import { cn } from '~/lib/utils/cn';

const ICON_SIZE = 20;

type SidebarNavProps = {
	resumeId: string;
	section: string;
	opened: boolean;
};

const SidebarNav = ({ resumeId, section, opened }: SidebarNavProps) => {
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
			<div className="mt-auto flex w-full flex-col items-center border-t border-dashed border-background-hover pt-5">
				<NavTooltip
					resumeId={resumeId}
					section="themes"
					icon={<Palette size={ICON_SIZE} />}
					content="Themes"
					isActive={section === 'themes'}
				/>
				<NavTooltip
					resumeId={resumeId}
					section="settings"
					icon={<Settings size={ICON_SIZE} />}
					content="Settings"
					isActive={section === 'settings'}
				/>
			</div>
		</nav>
	);
};

type NavTooltipProps = {
	resumeId: string;
	section: string;
	icon: ReactNode;
	content: string;
	isActive: boolean;
};

const NavTooltip = ({ resumeId, section, icon, content, isActive }: NavTooltipProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					asChild
					data-testid={`aside-tooltip-trigger-${section}`}
					className={cn(
						isActive
							? 'bg-background-hover text-accent'
							: 'text-muted hover:text-white',
						'w-full rounded-full p-2 duration-200 hover:bg-background-hover'
					)}>
					<Link href={`/builder/${resumeId}?section=${section}&opened=true&reload=0`}>
						{icon}
					</Link>
				</TooltipTrigger>
				<TooltipContent
					side="right"
					className="m-2 rounded-md bg-background-hover px-2 py-1">
					<p className="text-xs text-white">{content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default SidebarNav;
