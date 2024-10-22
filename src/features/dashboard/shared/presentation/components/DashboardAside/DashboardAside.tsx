import React from 'react';
import AsideLink from '~/features/dashboard/shared/presentation/components/AsideLink/AsideLink';

const DashboardAside = () => {
	return (
		<aside
			data-testid="dashboard-aside"
			className="bg-background-light flex w-full pt-2 md:w-[250px] md:p-5">
			<div
				aria-label="scroll-horizontal"
				className="flex h-[80px] w-full items-center gap-1 overflow-y-scroll px-5 pb-2 pt-12 sm:justify-center md:h-full md:flex-col md:items-start md:px-0 md:pb-0">
				<AsideLink href="/dashboard" label="Home" />
				<AsideLink href="/dashboard/feed" label="Discover" />
				<AsideLink href="/dashboard/messages" label="Messages" />
				<footer className="flex w-fit md:ml-0 md:mt-auto md:w-full md:flex-col md:border-t-4 md:pt-5">
					<AsideLink href="/dashboard/support" label="Support" />
					<AsideLink href="/dashboard/settings" label="Settings" />
				</footer>
			</div>
		</aside>
	);
};

export default DashboardAside;
