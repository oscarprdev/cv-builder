'use client';

import PublicFieldsForm from './PublicFieldsForm';
import React from 'react';
import { updatePublicFieldsAction } from '~/app/actions/share/update-public-fields.action';

interface ShareSectionProps {
	resumeId: string;
}

const ShareSection = ({ resumeId }: ShareSectionProps) => {
	return (
		<>
			<PublicFieldsForm resumeId={resumeId} action={updatePublicFieldsAction} />
		</>
	);
};

export default ShareSection;
