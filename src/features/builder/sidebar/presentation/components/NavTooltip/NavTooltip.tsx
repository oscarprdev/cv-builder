import Link from 'next/link';
import React, { ReactNode } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '~/features/shared/presentation/components/ui/tooltip/tooltip';
import { cn } from '~/lib/utils/cn';

const NavTooltip = ({
	resumeId,
	section,
	icon,
	content,
	isActive,
}: {
	resumeId: string;
	section: string;
	icon: ReactNode;
	content: string;
	isActive: boolean;
}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					asChild
					data-testid={`aside-tooltip-trigger-${section}`}
					className={cn(
						isActive ? 'bg-background-hover text-accent' : 'text-white',
						'rounded-full p-2 duration-200 hover:bg-background-hover'
					)}>
					<Link href={`/builder/${resumeId}?section=${section}&opened=true`}>{icon}</Link>
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

export default NavTooltip;
