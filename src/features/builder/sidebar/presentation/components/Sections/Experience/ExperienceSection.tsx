'use server';

import UpdateTitleSection from '../shared/UpdateTitleSection';
import ExperienceForm from './ExperienceForm';
import { ExperienceFormValues } from './types';
import React from 'react';
import { createNewExperienceAction } from '~/app/actions/experience/create-new-experience.action';
import { sortExperienceAction } from '~/app/actions/experience/sort-experience.action';
import ReorderGroup from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/ReorderGroup';
import {
	CustomFieldKind,
	ICustomField,
} from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/types';
import {
	ExperiencePresenter,
	resumeExperiencePresenter,
} from '~/features/builder/sidebar/presentation/presenter/resume-experience.presenter';
import { Enums } from '~/features/shared/models/resume.model';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';
import { capitalizeStr } from '~/lib/utils/str';

type ExperienceSectionProps = {
	resumeId: string;
};

const defaultExperience: ExperienceFormValues = {
	company: '',
	role: '',
	startDate: '',
	endDate: '',
	website: '',
	description: '',
};

const ExperienceSection = async ({ resumeId }: ExperienceSectionProps) => {
	const response = await resumeExperiencePresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	const experienceCustomFields = response.experienceInfo.map(
		experience =>
			({
				field: {
					id: experience.id,
					title: experience.company,
					subTitle: capitalizeStr(experience.role.toLowerCase()),
					kind: CustomFieldKind.EXPERIENCE,
				},
				data: experience,
			}) satisfies ICustomField<ExperiencePresenter>
	);

	return (
		<section className="flex flex-col gap-2">
			<UpdateTitleSection
				resumeId={resumeId}
				title={response.sectionTitle}
				sectionKind={Enums.resumeSection.EXPERIENCE}
			/>
			<p className="text-sm text-muted">Experience</p>
			<div className="max-h-[420px] overflow-y-scroll">
				<ReorderGroup<ExperiencePresenter>
					fields={experienceCustomFields}
					onReorderAction={sortExperienceAction}
				/>
			</div>
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
		</section>
	);
};

export default ExperienceSection;
