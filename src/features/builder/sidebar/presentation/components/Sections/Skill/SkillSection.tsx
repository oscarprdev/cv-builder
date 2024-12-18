'use server';

import UpdateTitleSection from '../shared/UpdateTitleSection';
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
import { Enums } from '~/features/shared/models/resume.model';
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

	const skillCustomFields = response.skillInfo.map(
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
		<section className="flex flex-col gap-2">
			<UpdateTitleSection
				resumeId={resumeId}
				title={response.sectionTitle}
				sectionKind={Enums.resumeSection.SKILLS}
			/>
			<p className="text-sm text-muted">Skills</p>
			<div className="max-h-[420px] overflow-y-scroll">
				<ReorderGroup<SkillPresenter>
					fields={skillCustomFields}
					onReorderAction={sortSkillAction}
				/>
			</div>
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
		</section>
	);
};

export default SkillSection;
