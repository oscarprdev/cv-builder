import { CustomFieldKind } from './ReorderGroup/types';
import { Pencil } from 'lucide-react';
import React, { PropsWithChildren } from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';

type EditDialogProps = {
	kind: CustomFieldKind;
};
const EditDialog = ({ kind, children }: PropsWithChildren<EditDialogProps>) => {
	const [editDialogOpen, setEditDialogOpen] = React.useState(false);

	const onEditDialogCancel = () => setEditDialogOpen(false);

	return (
		<Dialog
			open={editDialogOpen}
			onOpenChange={setEditDialogOpen}
			trigger={
				<Button variant={'ghost'} className="flex w-full items-center justify-start gap-2">
					<Pencil size={14} />
					Edit
				</Button>
			}
			title={`Edit ${kind}`}>
			{children}
			<div className="mt-3 flex w-full flex-col justify-center gap-3 px-10">
				<Button variant={'ghost'} onClick={onEditDialogCancel}>
					Cancel
				</Button>
			</div>
		</Dialog>
	);
};

export default EditDialog;
