import { Sparkle } from 'lucide-react';
import Dashboard from '~/features/dashboard/shared/presentation/layout/DashboardLayout';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<header className="absolute left-5 top-5 flex items-center gap-1 font-bold italic">
				<Sparkle size={18} className="text-accent" />
				Sparkle
			</header>
			<Dashboard>{children}</Dashboard>
		</>
	);
}
