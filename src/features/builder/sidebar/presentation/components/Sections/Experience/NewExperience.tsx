'use client';

import ExperienceForm from './ExperienceForm';
import { ExperienceFormValues } from './types';
import React from 'react';
import { toast } from 'sonner';
import { createNewExperienceAction } from '~/app/actions/create-new-experience.action';
import { isError } from '~/lib/utils/either';

type NewExperienceProps = {
	resumeId: string;
};

const NewExperience = ({ resumeId }: NewExperienceProps) => {
	const defaultValues: ExperienceFormValues = {
		company: '',
		position: '',
		startDate: '',
		endDate: '',
		website: '',
		description: '',
	};

	const onSubmit = async (values: ExperienceFormValues) => {
		const response = await createNewExperienceAction(values, resumeId);

		if (isError(response)) {
			toast.error(response.error);
		} else {
			toast.success(response.success);
		}
	};

	return (
		<ExperienceForm onSubmit={onSubmit} experienceInfo={defaultValues} submitText="Create" />
	);
};

export default NewExperience;
