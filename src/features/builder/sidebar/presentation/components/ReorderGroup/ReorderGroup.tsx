'use client';

import CustomField from './CustomField';
import { ICustomField } from './types';
import { AnimatePresence, Reorder } from 'framer-motion';
import React, { useState } from 'react';

function ReorderGroup<T extends ICustomField>({ fields }: { fields: T[] }) {
	const [fieldsState, setFieldsState] = useState(fields);

	const onReorderCustomFields = (values: T[]) => {
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
						<CustomField key={field.id} field={field} />
					))}
				</Reorder.Group>
			</AnimatePresence>
		</div>
	);
}

export default ReorderGroup;
