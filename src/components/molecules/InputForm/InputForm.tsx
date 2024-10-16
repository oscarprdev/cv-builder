import React from 'react';
import { Input } from '~/components/atoms/input/input';

const InputForm = ({
	type,
	name,
	placeholder,
	label,
	disabled,
}: {
	type: 'email' | 'text';
	name: string;
	placeholder: string;
	label: string;
	disabled: boolean;
}) => {
	return (
		<label htmlFor={name} className="flex flex-col gap-2 text-sm">
			{label}
			<Input
				disabled={disabled}
				id={name}
				type={type}
				name={name}
				placeholder={placeholder}
				required
			/>
		</label>
	);
};

export default InputForm;
