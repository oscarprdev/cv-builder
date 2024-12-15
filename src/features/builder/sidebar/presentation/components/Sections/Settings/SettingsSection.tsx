import DeleteResumeSection from './DeleteResumeSection';
import React from 'react';
import { deleteResumeAction } from '~/app/actions/delete-resume-action';

const SettingsSection = ({ resumeId }: { resumeId: string }) => {
	return (
		<>
			<DeleteResumeSection resumeId={resumeId} deleteAction={deleteResumeAction} />
		</>
	);
};

export default SettingsSection;
