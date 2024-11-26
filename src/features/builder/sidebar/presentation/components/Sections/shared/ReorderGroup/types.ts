export interface ICustomField {
	id: string;
	title: string;
	subTitle: string;
	kind: CustomFieldKind;
}

export enum CustomFieldKind {
	EXPERIENCE = 'experience',
	EDUCATION = 'education',
	SKILLS = 'skills',
	LANGUAGES = 'languages',
}
