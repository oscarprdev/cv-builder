import { CustomFieldKind } from './types';
import { EllipsisIcon, Pencil, Trash } from 'lucide-react';
import React from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '~/features/shared/presentation/components/ui/dropdown-menu/dropdown-menu';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '~/features/shared/presentation/components/ui/tooltip/tooltip';

const CustomFieldActions = ({
	fieldKind,
	fieldId,
}: {
	fieldKind: CustomFieldKind;
	fieldId: string;
}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<EllipsisIcon size={16} />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Dialog
									trigger={
										<Button
											variant={'ghost'}
											className="flex w-full items-center justify-start gap-2">
											<Pencil size={14} />
											Edit
										</Button>
									}
									title={fieldId}
									subTitle="subtitle">
									{fieldKind}
								</Dialog>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Dialog
									trigger={
										<Button
											variant={'ghost'}
											className="flex w-full items-center justify-start gap-2 hover:text-destructive">
											<Trash size={14} />
											Remove
										</Button>
									}
									title={fieldId}
									subTitle="subtitle">
									{fieldKind}
								</Dialog>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</TooltipTrigger>
				<TooltipContent
					side="right"
					className="m-2 rounded-md bg-background-hover px-2 py-1">
					<p className="text-xs text-white">Actions</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default CustomFieldActions;
