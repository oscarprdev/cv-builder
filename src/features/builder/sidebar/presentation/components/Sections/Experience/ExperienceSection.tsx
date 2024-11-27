'use server';

import { resumeExperiencePresenter } from '../../../presenter/resume-experience.presenter';
import ReorderGroup from '../shared/ReorderGroup/ReorderGroup';
import { CustomFieldKind, ICustomField } from '../shared/ReorderGroup/types';
import NewExperience from './NewExperience';
import React from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';

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
				title: experience.company,
				subTitle: experience.position,
				kind: CustomFieldKind.EXPERIENCE,
			}) satisfies ICustomField
	);

	return (
		<div>
			<ReorderGroup fields={experienceCustomFields}>
				{/* <p>Edit experience form</p> */}
			</ReorderGroup>
			<Dialog
				trigger={<Button className="mt-5 w-full">Add new experience</Button>}
				title="New experience">
				<NewExperience resumeId={resumeId} />
			</Dialog>
		</div>
	);
};

export default ExperienceSection;
