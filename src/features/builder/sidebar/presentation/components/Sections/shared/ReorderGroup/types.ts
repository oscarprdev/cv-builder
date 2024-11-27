export interface ICustomField<T extends CustomFieldDataCommon> {
	field: {
		id: string;
		title: string;
		subTitle: string;
		kind: CustomFieldKind;
	};
	data: T;
}

export interface CustomFieldDataCommon {
	resumeId: string;
}

export enum CustomFieldKind {
	EXPERIENCE = 'experience',
	EDUCATION = 'education',
	SKILLS = 'skills',
	LANGUAGES = 'languages',
}
