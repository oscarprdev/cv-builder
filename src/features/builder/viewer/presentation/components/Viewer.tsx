'use server';

import { resumePresenter } from '../presenter/resume.presenter';
import DownloadButton from './DownloadButton';
import Default from './templates/Default';
import React from 'react';
import { Enums } from '~/features/shared/models/resume.model';

const Viewer = async ({ resumeId }: { resumeId: string }) => {
	const resume = await resumePresenter(resumeId);

	if (typeof resume === 'string') return <div>Error</div>;

	const resumeTemplate = (theme: Enums.ResumeTheme) => {
		switch (theme) {
			case Enums.resumeTheme.HARVARD:
			// return <Default resume={resume} />;
			default:
				return <Default resume={resume} />;
		}
	};

	return (
		<section
			id="viewer"
			className="relative grid w-full place-items-center overflow-y-scroll p-10">
			{resumeTemplate(resume.resumeMeta.theme)}
			<DownloadButton />
		</section>
	);
};

export default Viewer;
