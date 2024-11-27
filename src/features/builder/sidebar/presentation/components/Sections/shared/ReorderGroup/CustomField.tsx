'use client';

import { ExperiencePresenter } from '../../../../presenter/resume-experience.presenter';
import EditExperience from '../../Experience/EditExperience';
import CustomFieldActions from './CustomFieldActions';
import { CustomFieldDataCommon, CustomFieldKind, ICustomField } from './types';
import { Reorder, useDragControls } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import React from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';

type CustomFieldProps<T extends CustomFieldDataCommon> = {
	customField: ICustomField<T>;
};

function CustomField<T extends CustomFieldDataCommon>({
	customField: { field, data },
}: CustomFieldProps<T>) {
	const controls = useDragControls();

	const isExperienceData = React.useCallback((data: T): data is T & ExperiencePresenter => {
		return 'company' in data;
	}, []);

	const editDialog = React.useMemo(() => {
		switch (field.kind) {
			case CustomFieldKind.EXPERIENCE:
				return (
					isExperienceData(data) && (
						<EditExperience resumeId={data.resumeId} experience={data} />
					)
				);
			default:
				return <p>Invalid field kind</p>;
		}
	}, [field.kind, data, isExperienceData]);

	return (
		<Reorder.Item
			className="border-muted/20 flex items-center gap-2 border pr-2"
			value={field}
			dragListener={false}
			dragControls={controls}
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -50 }}>
			<Button
				size="icon"
				variant="link"
				className="border-muted/20 h-full shrink-0 cursor-grab border-r px-2 py-6 hover:bg-background-hover"
				onPointerDown={event => {
					controls.start(event);
				}}>
				<GripVertical size={16} />
			</Button>
			<div className="flex w-full flex-col gap-1">
				<p className="text-muted/20 text-sm">{field.title}</p>
				<p className="text-xs text-muted">{field.subTitle}</p>
			</div>
			<CustomFieldActions
				fieldKind={field.kind}
				fieldId={field.id}
				fieldTitle={field.title}
				fieldSubtitle={field.subTitle}>
				{editDialog}
			</CustomFieldActions>
		</Reorder.Item>
	);
}

export default CustomField;
