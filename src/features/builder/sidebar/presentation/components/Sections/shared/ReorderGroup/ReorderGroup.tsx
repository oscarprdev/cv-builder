'use client';

import CustomField from './CustomField';
import { CustomFieldDataCommon, ICustomField } from './types';
import { AnimatePresence, Reorder } from 'framer-motion';
import React, { useState } from 'react';

type ReorderGroupProps<T extends CustomFieldDataCommon> = {
	fields: ICustomField<T>[];
};

function ReorderGroup<T extends CustomFieldDataCommon>({ fields }: ReorderGroupProps<T>) {
	const [fieldsState, setFieldsState] = useState(fields);

	const onReorderCustomFields = (values: ICustomField<T>[]) => {
		setFieldsState(values);
	};

	return (
		<div className="flex flex-col gap-2 border">
			<AnimatePresence>
				<Reorder.Group
					axis="y"
					className="list-none"
					values={fieldsState}
					onReorder={onReorderCustomFields}>
					{fieldsState.map(field => (
						<CustomField key={field.field.id} customField={field} />
					))}
				</Reorder.Group>
			</AnimatePresence>
		</div>
	);
}

export default ReorderGroup;
