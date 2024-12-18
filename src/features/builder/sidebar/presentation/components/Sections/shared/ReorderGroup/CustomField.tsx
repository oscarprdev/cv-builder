'use client';

import CustomFieldActions from './CustomFieldActions';
import { CustomFieldDataCommon, ICustomField } from './types';
import { Reorder, useDragControls } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import React from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';

type CustomFieldProps<T extends CustomFieldDataCommon> = {
	customField: ICustomField<T>;
	onDragEnd: () => Promise<void>;
};

function CustomField<T extends CustomFieldDataCommon>({
	customField,
	onDragEnd,
}: CustomFieldProps<T>) {
	const controls = useDragControls();

	return (
		<Reorder.Item
			className="border-muted/20 flex items-center gap-2 border bg-background-light pr-2"
			value={customField}
			dragListener={true}
			dragControls={controls}
			onDragEnd={onDragEnd}
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
				<p className="text-muted/20 text-sm">{customField.field.title}</p>
				<p className="text-xs capitalize text-muted">{customField.field.subTitle}</p>
			</div>
			<CustomFieldActions
				fieldKind={customField.field.kind}
				fieldId={customField.field.id}
				fieldTitle={customField.field.title}
				fieldSubtitle={customField.field.subTitle}
				fieldData={customField.data}
			/>
		</Reorder.Item>
	);
}

export default CustomField;
