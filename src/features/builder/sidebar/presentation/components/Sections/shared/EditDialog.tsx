import { CustomFieldKind } from './ReorderGroup/types';
import { Pencil } from 'lucide-react';
import React, { PropsWithChildren } from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';

type EditDialogProps = {
	kind: CustomFieldKind;
};
const EditDialog = ({ kind, children }: PropsWithChildren<EditDialogProps>) => {
	return (
		<Dialog
			trigger={
				<Button variant={'ghost'} className="flex w-full items-center justify-start gap-2">
					<Pencil size={14} />
					Edit
				</Button>
			}
			title={`Edit ${kind}`}>
			{children}
		</Dialog>
	);
};

export default EditDialog;
