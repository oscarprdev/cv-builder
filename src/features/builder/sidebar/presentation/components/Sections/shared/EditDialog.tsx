'use client';

import ExperienceForm from '../Experience/ExperienceForm';
import { Pencil } from 'lucide-react';
import React from 'react';
import { editNewExperienceAction } from '~/app/actions/experience/edit-experience.action';
import {
	CustomFieldDataCommon,
	CustomFieldKind,
} from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/types';
import { ExperiencePresenter } from '~/features/builder/sidebar/presentation/presenter/resume-experience.presenter';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';

type EditDialogProps<T extends CustomFieldDataCommon> = {
	data: T;
	kind: CustomFieldKind;
};
function EditDialog<T extends CustomFieldDataCommon>({ kind, data }: EditDialogProps<T>) {
	const isExperienceData = React.useCallback((data: T): data is T & ExperiencePresenter => {
		return 'company' in data;
	}, []);

	const content = React.useMemo(() => {
		switch (kind) {
			case CustomFieldKind.EXPERIENCE:
				return (
					isExperienceData(data) && (
						<ExperienceForm
							submitText="Edit experience"
							resumeId={data.resumeId}
							experienceInfo={data}
							action={editNewExperienceAction}
						/>
					)
				);
			default:
				return <p>Invalid field kind</p>;
		}
	}, [kind, data, isExperienceData]);

	return (
		<Dialog
			trigger={
				<Button variant={'ghost'} className="flex w-full items-center justify-start gap-2">
					<Pencil size={14} />
					Edit
				</Button>
			}
			title={`Edit ${kind}`}>
			{content}
		</Dialog>
	);
}

export default EditDialog;
