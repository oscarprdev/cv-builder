'use server';

import {
	EducationPresenter,
	resumeEducationPresenter,
} from '../../../presenter/resume-education.presenter';
import EducationForm from './EducationForm';
import { EducationFormValues } from './types';
import React from 'react';
import { createEducationAction } from '~/app/actions/education/create-education.action';
import { sortEducationAction } from '~/app/actions/education/sort-education.action';
import ReorderGroup from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/ReorderGroup';
import {
	CustomFieldKind,
	ICustomField,
} from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/types';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';
import { capitalizeStr } from '~/lib/utils/str';

type EducationSectionProps = {
	resumeId: string;
};

const defaultEducation: EducationFormValues = {
	institution: '',
	study: '',
	startDate: '',
	endDate: '',
	description: '',
};

const EducationSection = async ({ resumeId }: EducationSectionProps) => {
	const response = await resumeEducationPresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	const educationCustomFields = response.map(
		education =>
			({
				field: {
					id: education.id,
					title: education.institution,
					subTitle: capitalizeStr(education.study.toLowerCase()),
					kind: CustomFieldKind.EDUCATION,
				},
				data: education,
			}) satisfies ICustomField<EducationPresenter>
	);

	return (
		<div>
			<ReorderGroup<EducationPresenter>
				fields={educationCustomFields}
				onReorderAction={sortEducationAction}
			/>
			<Dialog
				trigger={<Button className="mt-5 w-full">Add new education</Button>}
				title="New education">
				<EducationForm
					resumeId={resumeId}
					educationInfo={defaultEducation}
					action={createEducationAction}
					submitText="Create new education"
				/>
			</Dialog>
		</div>
	);
};

export default EducationSection;
