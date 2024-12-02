'use client';

import LanguageForm from '../Language/LanguageForm';
import { Pencil } from 'lucide-react';
import React from 'react';
import { editEducationAction } from '~/app/actions/education/edit-education.action';
import { editNewExperienceAction } from '~/app/actions/experience/edit-experience.action';
import { editNewLanguageAction } from '~/app/actions/language/edit-language.action';
import { editNewSkillAction } from '~/app/actions/skill/edit-skill.action';
import EducationForm from '~/features/builder/sidebar/presentation/components/Sections/Education/EducationForm';
import ExperienceForm from '~/features/builder/sidebar/presentation/components/Sections/Experience/ExperienceForm';
import SkillForm from '~/features/builder/sidebar/presentation/components/Sections/Skill/SkillForm';
import {
	CustomFieldDataCommon,
	CustomFieldKind,
} from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/types';
import { EducationPresenter } from '~/features/builder/sidebar/presentation/presenter/resume-education.presenter';
import { ExperiencePresenter } from '~/features/builder/sidebar/presentation/presenter/resume-experience.presenter';
import { LanguagePresenter } from '~/features/builder/sidebar/presentation/presenter/resume-language.presenter';
import { SkillPresenter } from '~/features/builder/sidebar/presentation/presenter/resume-skill.presenter';
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

	const isEducationData = React.useCallback((data: T): data is T & EducationPresenter => {
		return 'institution' in data;
	}, []);

	const isSkillData = React.useCallback((data: T): data is T & SkillPresenter => {
		return 'level' in data;
	}, []);

	const isLanguageData = React.useCallback((data: T): data is T & LanguagePresenter => {
		return 'language' in data;
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
			case CustomFieldKind.EDUCATION:
				return (
					isEducationData(data) && (
						<EducationForm
							submitText="Edit education"
							resumeId={data.resumeId}
							educationInfo={data}
							action={editEducationAction}
						/>
					)
				);
			case CustomFieldKind.SKILLS:
				return (
					isSkillData(data) && (
						<SkillForm
							submitText="Edit skill"
							resumeId={data.resumeId}
							skillInfo={data}
							action={editNewSkillAction}
						/>
					)
				);
			case CustomFieldKind.LANGUAGES:
				return (
					isLanguageData(data) && (
						<LanguageForm
							submitText="Edit Language"
							resumeId={data.resumeId}
							languageInfo={data}
							action={editNewLanguageAction}
						/>
					)
				);
			default:
				return <p>Invalid field kind</p>;
		}
	}, [kind, data, isExperienceData, isEducationData, isSkillData, isLanguageData]);

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
