export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex h-screen w-screen">
			<section className="flex w-full flex-col bg-background px-10 py-20 md:px-20 lg:w-3/5">
				{children}
			</section>
			<section className="hidden w-full bg-backgroundLight md:block"></section>
		</main>
	);
}
