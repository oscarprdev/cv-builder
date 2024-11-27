import EditDialog from '../EditDialog';
import RemoveDialog from '../RemoveDialog';
import { CustomFieldKind } from './types';
import { EllipsisIcon } from 'lucide-react';
import React, { PropsWithChildren } from 'react';
import { removeExperienceAction } from '~/app/actions/remove-experience.action';
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
import { errorResponse } from '~/lib/utils/either';

type CustomFieldActionsProps = {
	fieldKind: CustomFieldKind;
	fieldTitle: string;
	fieldSubtitle: string;
	fieldId: string;
};

const CustomFieldActions = ({
	fieldKind,
	fieldId,
	fieldTitle,
	fieldSubtitle,
	children,
}: PropsWithChildren<CustomFieldActionsProps>) => {
	const removeAction = async () => {
		switch (fieldKind) {
			case CustomFieldKind.EXPERIENCE:
				return await removeExperienceAction(fieldId);
			default:
				return errorResponse('Invalid field kind');
		}
	};

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
								<EditDialog kind={fieldKind}>{children}</EditDialog>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<RemoveDialog
									title={fieldTitle}
									subtitle={fieldSubtitle}
									idToRemove={fieldId}
									kind={fieldKind}
									action={removeAction}
								/>
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
