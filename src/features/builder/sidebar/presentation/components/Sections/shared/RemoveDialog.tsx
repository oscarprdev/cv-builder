'use client';

import { CustomFieldKind } from './ReorderGroup/types';
import { useMutation } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';
import { Either, isError } from '~/lib/utils/either';

type RemoveDialogProps = {
	title: string;
	idToRemove: string;
	kind: CustomFieldKind;
	action: (id: string) => Promise<Either<string, string>>;
};

const RemoveDialog = ({ title, idToRemove, kind, action }: RemoveDialogProps) => {
	const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false);
	const onRemoveDialogCancel = () => setRemoveDialogOpen(false);

	const { mutateAsync, isPending } = useMutation({
		mutationFn: action,
		onSuccess: (response: Either<string, string>) => {
			if (isError(response)) {
				toast.error(response.error);
			} else {
				toast.success(response.success);
			}
		},
		onError: () => toast.error('Unexpected error removing field'),
	});

	const onRemoveDialogConfirm = async () => await mutateAsync(idToRemove);

	return (
		<Dialog
			open={removeDialogOpen}
			onOpenChange={setRemoveDialogOpen}
			trigger={
				<Button
					variant={'ghost'}
					className="flex w-full items-center justify-start gap-2 hover:text-destructive">
					<Trash size={14} />
					Remove
				</Button>
			}
			title={`Remove ${kind}`}>
			<p className="text-sm text-muted">Are you sure you want to remove this {kind}?</p>
			<p className="text-md text-center">{title}</p>
			<div className="mt-3 flex w-full flex-col justify-center gap-3 px-10">
				<Button onClick={onRemoveDialogConfirm}>{isPending ? 'loading' : 'Remove'}</Button>
				<Button variant={'ghost'} onClick={onRemoveDialogCancel}>
					Cancel
				</Button>
			</div>
		</Dialog>
	);
};

export default RemoveDialog;
