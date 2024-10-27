'use client';

import ExperienceForm from './ExperienceForm';
import React from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';

const AddNewExperienceButton = () => {
	return (
		<Dialog
			trigger={<Button className="mt-5 w-full">Add new experience</Button>}
			title="New experience">
			<ExperienceForm />
		</Dialog>
	);
};

export default AddNewExperienceButton;
