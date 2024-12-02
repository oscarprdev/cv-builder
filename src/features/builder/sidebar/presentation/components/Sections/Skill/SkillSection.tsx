'use server';

import SkillForm from './SkillForm';
import { SkillFormValues } from './types';
import React from 'react';
import { createNewSkillAction } from '~/app/actions/skill/create-new-skill.action';
import { sortSkillAction } from '~/app/actions/skill/sort-skill.action';
import ReorderGroup from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/ReorderGroup';
import {
	CustomFieldKind,
	ICustomField,
} from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/types';
import {
	SkillPresenter,
	resumeSkillPresenter,
} from '~/features/builder/sidebar/presentation/presenter/resume-skill.presenter';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';

type SkillSectionProps = {
	resumeId: string;
};

const defaultSkill: SkillFormValues = {
	name: '',
	level: 2,
};

const SkillSection = async ({ resumeId }: SkillSectionProps) => {
	const response = await resumeSkillPresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	const skillCustomFields = response.map(
		skill =>
			({
				field: {
					id: skill.id,
					title: skill.name,
					subTitle: String(skill.level),
					kind: CustomFieldKind.SKILLS,
				},
				data: skill,
			}) satisfies ICustomField<SkillPresenter>
	);

	return (
		<div>
			<ReorderGroup<SkillPresenter>
				fields={skillCustomFields}
				onReorderAction={sortSkillAction}
			/>
			<Dialog
				trigger={<Button className="mt-5 w-full">Add new skill</Button>}
				title="New skill">
				<SkillForm
					resumeId={resumeId}
					skillInfo={defaultSkill}
					action={createNewSkillAction}
					submitText="Create new skill"
				/>
			</Dialog>
		</div>
	);
};

export default SkillSection;
