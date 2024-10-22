'use server';

import React from 'react';
import BuilderAside from '~/features/builder/presentation/components/BuilderAside/BuilderAside';
import { builderPresenter } from '~/features/builder/presentation/presenter/builder.presenter';

const Builder = async ({ resumeId }: { resumeId: string }) => {
	const { basicInfo } = await builderPresenter({ resumeId });

	return (
		<main className="flex h-screen w-screen flex-col md:flex-row">
			<BuilderAside basicInfo={basicInfo}></BuilderAside>
			<section className="flex flex-col p-5">{JSON.stringify(basicInfo)}</section>
		</main>
	);
};

export default Builder;
