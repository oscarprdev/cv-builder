import './globals.css';
import { Sparkle } from 'lucide-react';
import type { Metadata } from 'next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import QueryProvider from '~/lib/react-query/provider/QueryProvider';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Cv Builder',
	description: 'Cv builder',
};

export default function RootLayout({
	children,
	params: { session },
}: Readonly<{
	children: React.ReactNode;
	params: { session: Session };
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<header className="absolute left-5 top-5 flex items-center gap-1 font-bold italic">
					<Sparkle size={18} className="text-accent" />
					Sparkle
				</header>
				<SessionProvider session={session}>
					<QueryProvider>
						{children}
						<Toaster
							toastOptions={{
								className:
									'text-xs bg-background text-foreground border border-muted-foreground',
							}}
						/>
					</QueryProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
