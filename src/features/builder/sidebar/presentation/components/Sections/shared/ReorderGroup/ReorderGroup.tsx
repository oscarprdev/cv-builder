'use client';

import CustomField from './CustomField';
import { ICustomField } from './types';
import { AnimatePresence, Reorder } from 'framer-motion';
import React, { PropsWithChildren, useState } from 'react';

type ReorderGroupProps<T extends ICustomField> = {
	fields: T[];
};

function ReorderGroup<T extends ICustomField>({
	fields,
	children,
}: PropsWithChildren<ReorderGroupProps<T>>) {
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
						<CustomField key={field.id} field={field}>
							{children}
						</CustomField>
					))}
				</Reorder.Group>
			</AnimatePresence>
		</div>
	);
}

export default ReorderGroup;
