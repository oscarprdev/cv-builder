'use server';

import LanguageForm from './LanguageForm';
import { LanguageFormValues } from './types';
import React from 'react';
import { createNewLanguageAction } from '~/app/actions/language/create-new-language.action';
import { sortLanguageAction } from '~/app/actions/language/sort-language.action';
import ReorderGroup from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/ReorderGroup';
import {
	CustomFieldKind,
	ICustomField,
} from '~/features/builder/sidebar/presentation/components/Sections/shared/ReorderGroup/types';
import {
	LanguagePresenter,
	resumeLanguagePresenter,
} from '~/features/builder/sidebar/presentation/presenter/resume-language.presenter';
import { Enums } from '~/features/shared/models/resume.model';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';
import { capitalizeStr } from '~/lib/utils/str';

type LanguageSectionProps = {
	resumeId: string;
};

const defaultLanguage: LanguageFormValues = {
	language: '',
	level: Enums.languageLevel.INTERMEDIATE,
	certificationUrl: undefined,
};

const LanguageSection = async ({ resumeId }: LanguageSectionProps) => {
	const response = await resumeLanguagePresenter({ resumeId });

	if (typeof response === 'string') return <div>{response}</div>;

	const languageCustomFields = response.map(
		language =>
			({
				field: {
					id: language.id,
					title: language.language,
					subTitle: capitalizeStr(language.level.toLowerCase()),
					kind: CustomFieldKind.LANGUAGES,
				},
				data: language,
			}) satisfies ICustomField<LanguagePresenter>
	);

	return (
		<div>
			<ReorderGroup<LanguagePresenter>
				fields={languageCustomFields}
				onReorderAction={sortLanguageAction}
			/>
			<Dialog
				trigger={<Button className="mt-5 w-full">Add new language</Button>}
				title="New language">
				<LanguageForm
					resumeId={resumeId}
					languageInfo={defaultLanguage}
					action={createNewLanguageAction}
					submitText="Create new language"
				/>
			</Dialog>
		</div>
	);
};

export default LanguageSection;
