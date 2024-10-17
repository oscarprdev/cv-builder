import React from 'react';
import DashboardResumesList from '~/components/organisms/DashboardResumesList/DashboardResumesList';
import NewResumeDialog from '~/components/organisms/NewResumeDialog/NewResumeDialog';

const DashboardHomePage = () => {
	return (
		<section data-testid="dashboard-home" className="flex w-full flex-col p-5">
			<h2 className="text-2xl font-bold">Welcome back</h2>
			<div className="mt-2 flex flex-col gap-2 border-t-2 p-5">
				<h3 className="text-sm text-muted">Your resumes:</h3>
				<div className="flex w-full flex-wrap items-center justify-center gap-5 md:justify-start">
					<NewResumeDialog />
					<DashboardResumesList />
				</div>
			</div>
		</section>
	);
};

export default DashboardHomePage;
