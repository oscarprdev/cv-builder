import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import React, { ReactNode } from 'react';
import { cn } from '~/lib/utils/cn';

const AsideTooltip = ({
	section,
	icon,
	content,
	isActive,
	onShowSection,
}: {
	section: string;
	icon: ReactNode;
	content: string;
	isActive: boolean;
	onShowSection: (section: string) => void;
}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					onClick={() => onShowSection(section)}
					className={cn(
						isActive ? 'bg-background-hover text-accent' : 'text-white',
						'rounded-full p-2 duration-200 hover:bg-background-hover'
					)}>
					{icon}
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

export default AsideTooltip;
