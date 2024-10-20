import React, { PropsWithChildren } from 'react';
import NewResumeDialog from '~/components/organisms/NewResumeDialog/NewResumeDialog';

const DashboardHomePage = ({ children }: PropsWithChildren) => {
	return (
		<section data-testid="dashboard-home" className="flex w-full flex-col p-5">
			<h2 className="text-2xl font-bold">Welcome back</h2>
			<div className="mt-2 flex flex-col gap-2 border-t-2 p-5">
				<h3 className="text-sm text-muted">Your resumes:</h3>
				<div className="flex w-full flex-wrap items-center justify-center gap-5 md:justify-start">
					<NewResumeDialog />
					{children}
				</div>
			</div>
		</section>
	);
};

export default DashboardHomePage;
