'use client';

import React from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';

const SettingsSection = ({ resumeId }: { resumeId: string }) => {
	const onDeleteResume = () => {
		console.log('delete resume', resumeId);
	};
	return (
		<div>
			<Button variant={'destructive'} onClick={onDeleteResume}>
				Delete resume
			</Button>
		</div>
	);
};

export default SettingsSection;
