'use server';

import ExperienceForm from './ExperienceForm';
import { ExperienceFormValues } from './types';
import React from 'react';
import { createNewExperienceAction } from '~/app/actions/create-new-experience.action';
import ReorderGroup from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/ReorderGroup';
import {
	CustomFieldKind,
	ICustomField,
} from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/types';
import {
	ExperiencePresenter,
	resumeExperiencePresenter,
} from '~/features/builder/sidebar/presentation/presenter/resume-experience.presenter';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';

type ExperienceSectionProps = {
	resumeId: string;
};

const defaultExperience: ExperienceFormValues = {
	company: '',
	position: '',
	startDate: '',
	endDate: '',
	website: '',
	description: '',
};

const ExperienceSection = async ({ resumeId }: ExperienceSectionProps) => {
	const response = await resumeExperiencePresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	const experienceCustomFields = response.map(
		experience =>
			({
				field: {
					id: experience.id,
					title: experience.company,
					subTitle: experience.position,
					kind: CustomFieldKind.EXPERIENCE,
				},
				data: experience,
			}) satisfies ICustomField<ExperiencePresenter>
	);

	return (
		<div>
			<ReorderGroup<ExperiencePresenter> fields={experienceCustomFields} />
			<Dialog
				trigger={<Button className="mt-5 w-full">Add new experience</Button>}
				title="New experience">
				<ExperienceForm
					resumeId={resumeId}
					experienceInfo={defaultExperience}
					action={createNewExperienceAction}
					submitText="Create new experience"
				/>
			</Dialog>
		</div>
	);
};

export default ExperienceSection;
