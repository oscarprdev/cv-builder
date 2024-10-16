export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex h-screen w-screen">
			<section className="flex w-3/5 flex-col bg-background p-10">{children}</section>
			<section className="w-full bg-backgroundLight"></section>
		</main>
	);
}
