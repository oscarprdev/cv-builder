'use client';

import { useDebounce } from '../../../hooks/useDebounce';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { UpdateTitleActionInput, updateTitleAction } from '~/app/actions/update-title.action';
import { Enums } from '~/features/shared/models/resume.model';
import { Input } from '~/features/shared/presentation/components/ui/input/input';
import { Either, isError } from '~/lib/utils/either';

interface UpdateTitleSectionProps {
	title: string;
	resumeId: string;
	sectionKind: Enums.ResumeSection;
}

type ChangeInput = React.ChangeEvent<HTMLInputElement>;

const UpdateTitleSection = ({ title, resumeId, sectionKind }: UpdateTitleSectionProps) => {
	const { debounce } = useDebounce();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (input: UpdateTitleActionInput) => {
			return await updateTitleAction(input);
		},
		onSuccess: (response: Either<string, string>) => {
			if (isError(response)) {
				toast.error(response.error);
				return;
			}

			toast.success(response.success);
		},
		onError: () => {
			toast.error('Unexpected error updating title');
		},
	});

	const onInputChange = debounce<ChangeInput>((input: ChangeInput) => {
		const value = input.target.value;
		mutateAsync({ value, resumeId, sectionKind });
	}, 600);

	return (
		<section>
			<label className="flex flex-col gap-2">
				<p className="text-sm text-muted">Section title</p>
				<div className="relative">
					<Input defaultValue={title} onInput={onInputChange} disabled={isPending} />
					{isPending && (
						<LoaderCircle
							size={12}
							data-testid="loader-icon"
							className="absolute right-2 top-3 animate-spin"
						/>
					)}
				</div>
			</label>
		</section>
	);
};

export default UpdateTitleSection;
