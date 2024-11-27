'use client';

import NewExperienceForm from './NewExperienceForm';
import { ExperienceFormValues } from './types';
import React from 'react';
import { toast } from 'sonner';
import { createNewExperienceAction } from '~/app/actions/create-new-experience.action';
import { isError } from '~/lib/utils/either';

type NewExperienceProps = {
	resumeId: string;
};

const NewExperience = ({ resumeId }: NewExperienceProps) => {
	const onSubmit = async (values: ExperienceFormValues) => {
		const response = await createNewExperienceAction(values, resumeId);

		if (isError(response)) {
			toast.error(response.error);
		} else {
			toast.success(response.success);
		}
	};

	return <NewExperienceForm onSubmit={onSubmit} />;
};

export default NewExperience;
