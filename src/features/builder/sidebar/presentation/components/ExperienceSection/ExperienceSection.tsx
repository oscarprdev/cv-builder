import AddNewCustomItemButton from '../AddNewCustomItemButton/AddNewCustomItemButton';
import ReorderGroup from '../ReorderGroup/ReorderGroup';
import { CustomFieldKind } from '../ReorderGroup/types';
import ExperienceForm from './ExperienceForm';
import React from 'react';

type Experience = {
	id: string;
	title: string;
	subTitle: string;
	date: string;
	description: string;
	kind: CustomFieldKind.EXPERIENCE;
};

const ExperienceSection = () => {
	return (
		<div>
			<ReorderGroup<Experience>
				fields={[
					{
						id: '1',
						title: 'Experience 1',
						subTitle: '2022',
						date: '2022',
						description:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
						kind: CustomFieldKind.EXPERIENCE,
					},
					{
						id: '2',
						title: 'Experience 2',
						subTitle: '2023',
						date: '2022',
						description:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
						kind: CustomFieldKind.EXPERIENCE,
					},
					{
						id: '3',
						title: 'Experience 3',
						subTitle: '2024',
						date: '2022',
						description:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
						kind: CustomFieldKind.EXPERIENCE,
					},
				]}
			/>
			<AddNewCustomItemButton>
				<ExperienceForm />
			</AddNewCustomItemButton>
		</div>
	);
};

export default ExperienceSection;
