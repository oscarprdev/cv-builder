import EditDialog from '../EditDialog';
import RemoveDialog from '../RemoveDialog';
import { CustomFieldDataCommon, CustomFieldKind } from './types';
import { EllipsisIcon } from 'lucide-react';
import React from 'react';
import { deleteExperienceAction } from '~/app/actions/experience/delete-experience.action';
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

type CustomFieldActionsProps<T extends CustomFieldDataCommon> = {
	fieldKind: CustomFieldKind;
	fieldTitle: string;
	fieldSubtitle: string;
	fieldId: string;
	fieldData: T;
};

function CustomFieldActions<T extends CustomFieldDataCommon>({
	fieldKind,
	fieldId,
	fieldTitle,
	fieldSubtitle,
	fieldData,
}: CustomFieldActionsProps<T>) {
	const removeAction = async () => {
		switch (fieldKind) {
			case CustomFieldKind.EXPERIENCE:
				return await deleteExperienceAction(fieldId);
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
								<EditDialog kind={fieldKind} data={fieldData} />
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<RemoveDialog
									resumeId={fieldData.resumeId}
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
}

export default CustomFieldActions;
