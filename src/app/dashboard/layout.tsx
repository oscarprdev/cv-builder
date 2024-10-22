import Dashboard from '~/features/dashboard/shared/presentation/layout/DashboardLayout';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Dashboard>{children}</Dashboard>;
}
