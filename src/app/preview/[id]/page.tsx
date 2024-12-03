'use server';

import React from 'react';
import Default from '~/features/builder/viewer/presentation/components/templates/Default';
import { resumePresenter } from '~/features/builder/viewer/presentation/presenter/resume.presenter';

export default async function Preview({ params: { id } }: { params: { id: string } }) {
	const resume = await resumePresenter(id);

	if (typeof resume === 'string') return <div>Error</div>;

	return (
		<section className="grid h-full w-screen place-items-center bg-white">
			<Default resume={resume} />
		</section>
	);
}
