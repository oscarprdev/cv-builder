'use client';

import { useDebounce } from '../../../hooks/useDebounce';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { UpdateTitleActionInput, updateTitleAction } from '~/app/actions/update-title.action';
import { Enums } from '~/features/shared/models/resume.model';
import { Input } from '~/features/shared/presentation/components/ui/input/input';

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
		onSuccess: () => {
			console.log('success');
		},
		onError: () => {
			console.log('error');
		},
	});

	const onInputChange = debounce<ChangeInput>((input: ChangeInput) => {
		const value = input.target.value;
		mutateAsync({ value, resumeId, sectionKind });
	}, 2000);

	return (
		<section>
			<label>
				<p className="text-sm text-muted">Section title</p>
				<Input defaultValue={title} onInput={onInputChange} disabled={isPending} />
			</label>
		</section>
	);
};

export default UpdateTitleSection;
