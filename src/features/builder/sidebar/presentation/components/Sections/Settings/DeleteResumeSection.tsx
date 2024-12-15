'use client';

import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';
import { Either, isError } from '~/lib/utils/either';

interface DeleteResumeSectionProps {
	resumeId: string;
	deleteAction: (resumeId: string) => Promise<Either<string, string>>;
}

const DeleteResumeSection = ({ resumeId, deleteAction }: DeleteResumeSectionProps) => {
	const router = useRouter();
	const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false);
	const onRemoveDialogCancel = () => setRemoveDialogOpen(false);

	const { mutateAsync, isPending } = useMutation({
		mutationFn: deleteAction,
		onSuccess: (response: Either<string, string>) => {
			if (isError(response)) {
				toast.error(response.error);
			} else {
				toast.success(response.success);
				router.push('/dashboard');
			}
		},
		onError: () => toast.error('Unexpected error removing field'),
	});

	const onRemoveDialogConfirm = async () => await mutateAsync(resumeId);

	return (
		<div className="flex flex-col gap-2">
			<p className="text-sm font-semibold">Delete this resume</p>
			<p className="text-xs text-muted">
				Once you delete a resume, there is no going back. Please be certain.
			</p>

			<Dialog
				open={removeDialogOpen}
				onOpenChange={setRemoveDialogOpen}
				trigger={
					<Button variant={'destructive'} className="mt-2">
						Delete resume
					</Button>
				}
				title="Delete resume">
				<div className="mt-3 flex w-full flex-col justify-center gap-3 px-10">
					<p>Are you sure you want to delete this resume?</p>
					<Button variant={'destructive'} onClick={onRemoveDialogConfirm}>
						{isPending ? (
							<LoaderCircle data-testid="loader-icon" className="animate-spin" />
						) : (
							'Remove'
						)}
					</Button>
					<Button variant={'ghost'} onClick={onRemoveDialogCancel}>
						Cancel
					</Button>
				</div>
			</Dialog>
		</div>
	);
};

export default DeleteResumeSection;
