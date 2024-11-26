import { CustomFieldKind } from './types';
import { EllipsisIcon, Pencil, Trash } from 'lucide-react';
import React, { PropsWithChildren } from 'react';
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

type CustomFieldActionsProps = {
	fieldKind: CustomFieldKind;
	fieldTitle: string;
	fieldId: string;
};

const CustomFieldActions = ({
	fieldKind,
	fieldId,
	fieldTitle,
	children,
}: PropsWithChildren<CustomFieldActionsProps>) => {
	const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false);
	const [editDialogOpen, setEditDialogOpen] = React.useState(false);

	const onRemoveDialogCancel = () => setRemoveDialogOpen(false);
	const onEditDialogCancel = () => setEditDialogOpen(false);

	const onRemoveDialogConfirm = () => {
		// Remove custom field by id and kind
		console.log('Remove custom field', fieldId, fieldKind);
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
								<Dialog
									open={editDialogOpen}
									onOpenChange={setEditDialogOpen}
									trigger={
										<Button
											variant={'ghost'}
											className="flex w-full items-center justify-start gap-2">
											<Pencil size={14} />
											Edit
										</Button>
									}
									title={`Edit ${fieldKind}`}>
									{children}
									<div className="mt-3 flex w-full flex-col justify-center gap-3 px-10">
										<Button variant={'ghost'} onClick={onEditDialogCancel}>
											Cancel
										</Button>
									</div>
								</Dialog>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Dialog
									open={removeDialogOpen}
									onOpenChange={setRemoveDialogOpen}
									trigger={
										<Button
											variant={'ghost'}
											className="flex w-full items-center justify-start gap-2 hover:text-destructive"
											onClick={onRemoveDialogConfirm}>
											<Trash size={14} />
											Remove
										</Button>
									}
									title={`Remove ${fieldKind}`}>
									<p className="text-sm text-muted">
										Are you sure you want to remove this {fieldKind}?
									</p>
									<p className="text-md text-center">{fieldTitle}</p>
									<div className="mt-3 flex w-full flex-col justify-center gap-3 px-10">
										<Button>Remove</Button>
										<Button variant={'ghost'} onClick={onRemoveDialogCancel}>
											Cancel
										</Button>
									</div>
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
