'use client';

import React from 'react';
import SubmitButton from '~/features/shared/presentation/components/SubmitButton/SubmitButton';

// import { Input } from '~/features/shared/presentation/components/ui/input/input';

const ExperienceForm = () => {
	const isPending = false;
	const isFormValid = false;
	// const onInputChange = () => {};

	return (
		<form>
			{/* <Input
				disabled={isPending}
				value={''}
				id="fullName"
				label="Full Name"
				type="text"
				name="fullName"
				placeholder="Jhon Doe"
				pattern="^.{1,30}$"
				errorMessage="Maximum length is 30 characters"
				required
				onChange={onInputChange}
			/>
			<Input
				disabled={isPending}
				value={''}
				id="fullName"
				label="Full Name"
				type="text"
				name="fullName"
				placeholder="Jhon Doe"
				pattern="^.{1,30}$"
				errorMessage="Maximum length is 30 characters"
				required
				onChange={onInputChange}
			/>
			<Input
				disabled={isPending}
				value={''}
				id="fullName"
				label="Full Name"
				type="text"
				name="fullName"
				placeholder="Jhon Doe"
				pattern="^.{1,30}$"
				errorMessage="Maximum length is 30 characters"
				required
				onChange={onInputChange}
			/> */}
			<SubmitButton text="Update basic info" isPending={isPending} disabled={!isFormValid} />
		</form>
	);
};

export default ExperienceForm;
