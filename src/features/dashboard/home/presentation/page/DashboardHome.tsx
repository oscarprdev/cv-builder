'use server';

import React, { Suspense } from 'react';
import {
	DashboardResumesList,
	FallbackDashboardResumesList,
} from '~/features/dashboard/home/presentation/components/DashboardResumesList/DashboardResumesList';
import NewResumeDialog from '~/features/dashboard/home/presentation/components/NewResumeDialog/NewResumeDialog';
import { dashboardHomePresenter } from '~/features/dashboard/home/presentation/presenter/dashboard-home.presenter';

const DashboardHomePage = async ({ userId }: { userId: string }) => {
	const { resumesCount, listResumesUsecase } = await dashboardHomePresenter(userId);

	return (
		<section data-testid="dashboard-home" className="flex w-full flex-col p-5">
			<h2 className="text-2xl font-bold">Welcome back</h2>
			<div className="mt-2 flex flex-col gap-2 border-t-2 p-5">
				<h3 className="text-sm text-muted">Your resumes:</h3>
				<div className="flex w-full flex-wrap items-center justify-center gap-5 md:justify-start">
					<NewResumeDialog />
					{resumesCount && resumesCount > 0 && (
						<Suspense fallback={<FallbackDashboardResumesList />}>
							<DashboardResumesList userId={userId} usecase={listResumesUsecase} />
						</Suspense>
					)}
				</div>
			</div>
		</section>
	);
};

export default DashboardHomePage;
