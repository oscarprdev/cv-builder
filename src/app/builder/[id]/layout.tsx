import BuilderAside from '~/components/organisms/BuilderAside/BuilderAside';

export default function BuilderLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex h-screen w-screen flex-col md:flex-row">
			<BuilderAside />
			<section className="flex w-full flex-col p-5">{children}</section>
		</main>
	);
}
