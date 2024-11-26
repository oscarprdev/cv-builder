'use client';

import React from 'react';
import SubmitButton from '~/features/shared/presentation/components/SubmitButton/SubmitButton';
import { Input } from '~/features/shared/presentation/components/ui/input/input';

const ExperienceForm = () => {
	const isPending = false;
	const isFormValid = false;
	// const onInputChange = () => {};

	return (
		<form>
			<label
				htmlFor="fullname"
				className="relative flex w-full flex-col gap-2 text-sm font-semibold">
				Full Name
				<Input
					disabled={isPending}
					id="fullName"
					type="text"
					name="fullName"
					placeholder="Jhon Doe"
					pattern="^.{1,30}$"
					required
				/>
			</label>
			<label
				htmlFor="fullname"
				className="relative flex w-full flex-col gap-2 text-sm font-semibold">
				Full Name
				<Input
					disabled={isPending}
					id="fullName"
					type="text"
					name="fullName"
					placeholder="Jhon Doe"
					pattern="^.{1,30}$"
					required
				/>
			</label>
			<label
				htmlFor="fullname"
				className="relative flex w-full flex-col gap-2 text-sm font-semibold">
				Full Name
				<Input
					disabled={isPending}
					id="fullName"
					type="text"
					name="fullName"
					placeholder="Jhon Doe"
					pattern="^.{1,30}$"
					required
				/>
			</label>
			<SubmitButton text="Update basic info" isPending={isPending} disabled={!isFormValid} />
		</form>
	);
};

export default ExperienceForm;
