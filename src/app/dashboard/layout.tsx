import DashboardAside from '~/components/organisms/DashboardAside/DashboardAside';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex h-screen w-screen flex-col md:flex-row">
			<DashboardAside />
			<section data-testid="dashboard-resumes-list" className="flex w-full flex-col p-5">
				{children}
			</section>
		</main>
	);
}
