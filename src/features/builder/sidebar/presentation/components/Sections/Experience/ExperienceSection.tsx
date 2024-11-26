import ReorderGroup from '../shared/ReorderGroup/ReorderGroup';
import { CustomFieldKind } from '../shared/ReorderGroup/types';
import ExperienceForm from './ExperienceForm';
import React from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';

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
			<Dialog
				trigger={<Button className="mt-5 w-full">Add new experience</Button>}
				title="New experience">
				<ExperienceForm />
			</Dialog>
		</div>
	);
};

export default ExperienceSection;
