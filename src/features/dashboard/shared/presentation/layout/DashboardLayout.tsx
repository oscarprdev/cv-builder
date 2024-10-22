import React, { PropsWithChildren } from 'react';
import DashboardAside from '~/features/dashboard/shared/presentation/components/DashboardAside/DashboardAside';

const Dashboard = ({ children }: PropsWithChildren) => {
	return (
		<main className="flex h-screen w-screen flex-col md:flex-row">
			<DashboardAside />
			<section className="flex w-full flex-col p-5">{children}</section>
		</main>
	);
};

export default Dashboard;
