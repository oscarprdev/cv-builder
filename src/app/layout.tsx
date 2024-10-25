import './globals.css';
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

export default async function RootLayout({
	children,
	params: { session },
}: Readonly<{
	children: React.ReactNode;
	params: { session: Session };
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
