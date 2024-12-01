'use client';

import CustomField from './CustomField';
import { CustomFieldDataCommon, ICustomField } from './types';
import { AnimatePresence, Reorder } from 'framer-motion';
import React from 'react';
import { Either } from '~/lib/utils/either';

type ReorderGroupProps<T extends CustomFieldDataCommon> = {
	fields: ICustomField<T>[];
	onReorderAction: (
		input: { id: string; sortOrder: number }[]
	) => Promise<Either<string, string>>;
};

function ReorderGroup<T extends CustomFieldDataCommon>({
	fields,
	onReorderAction,
}: ReorderGroupProps<T>) {
	const [fieldsSorted, setFieldsSorted] = React.useState(
		fields.sort((a, b) => a.data.sortOrder - b.data.sortOrder)
	);

	const onReorderGroup = (fields: ICustomField<T>[]) => setFieldsSorted(fields);

	const onDragEnd = async () => {
		const mapFields = (fields: ICustomField<T>[]) => {
			return fields.map(({ field }, index) => ({
				id: field.id,
				sortOrder: index,
			}));
		};

		const newFieldsSortData = mapFields(fieldsSorted);

		await onReorderAction(newFieldsSortData);
	};

	return (
		<div className="relative flex flex-col gap-2 border">
			<AnimatePresence>
				<Reorder.Group
					axis="y"
					className="list-none"
					values={fieldsSorted}
					onReorder={onReorderGroup}>
					{fieldsSorted.map(field => (
						<CustomField
							key={field.field.id}
							customField={field}
							onDragEnd={onDragEnd}
						/>
					))}
				</Reorder.Group>
			</AnimatePresence>
		</div>
	);
}

export default ReorderGroup;
