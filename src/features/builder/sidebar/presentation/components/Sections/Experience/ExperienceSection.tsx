'use server';

import { resumeExperiencePresenter } from '../../../presenter/resume-experience.presenter';
import ReorderGroup from '../shared/ReorderGroup/ReorderGroup';
import { CustomFieldKind } from '../shared/ReorderGroup/types';
import ExperienceForm from './ExperienceForm';
import React from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';

type ExperienceCustomField = {
	id: string;
	title: string;
	subTitle: string;

	kind: CustomFieldKind.EXPERIENCE;
};

type ExperienceSectionProps = {
	resumeId: string;
};

const ExperienceSection = async ({ resumeId }: ExperienceSectionProps) => {
	const response = await resumeExperiencePresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	const experienceCustomFields = response.map(
		experience =>
			({
				id: experience.id,
				title: experience.title,
				subTitle: experience.description,
				kind: CustomFieldKind.EXPERIENCE,
			}) satisfies ExperienceCustomField
	);

	return (
		<div>
			<ReorderGroup<ExperienceCustomField> fields={experienceCustomFields} />
			<Dialog
				trigger={<Button className="mt-5 w-full">Add new experience</Button>}
				title="New experience">
				<ExperienceForm />
			</Dialog>
		</div>
	);
};

export default ExperienceSection;
