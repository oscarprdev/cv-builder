'use client';

import { ExperiencePresenter } from '../../../presenter/resume-experience.presenter';
import ExperienceForm from './ExperienceForm';
import { ExperienceFormValues } from './types';
import React from 'react';
import { toast } from 'sonner';
import { editNewExperienceAction } from '~/app/actions/edit-experience.action';
import { isError } from '~/lib/utils/either';

type EditExperienceProps = {
	resumeId: string;
	experience: ExperiencePresenter;
};

const EditExperience = ({ resumeId, experience }: EditExperienceProps) => {
	const onSubmit = async (values: ExperienceFormValues) => {
		const response = await editNewExperienceAction(values, resumeId);
		if (isError(response)) {
			toast.error(response.error);
		} else {
			toast.success(response.success);
		}
	};

	return <ExperienceForm onSubmit={onSubmit} experienceInfo={experience} submitText="Edit" />;
};

export default EditExperience;
