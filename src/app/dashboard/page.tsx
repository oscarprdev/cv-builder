import AsideLink from '~/components/molecules/AsideLink/AsideLink';

export default function Dashboard() {
	return (
		<main className="flex h-screen w-screen flex-col md:flex-row">
			<aside
				aria-label="scroll-horizontal"
				className="flex w-full overflow-scroll bg-backgroundLight pt-2 md:w-[250px] md:p-5">
				<div className="flex w-full items-center gap-1 px-5 pb-2 pt-12 sm:justify-center md:h-full md:flex-col md:items-start md:px-0 md:pb-0">
					<AsideLink href="/dashboard" label="Home" />
					<AsideLink href="/feed" label="Discover" />
					<AsideLink href="/messages" label="Messages" />
					<footer className="flex w-fit md:ml-0 md:mt-auto md:w-full md:flex-col md:border-t-4 md:pt-5">
						<AsideLink href="/support" label="Support" />
						<AsideLink href="/settings" label="Settings" />
					</footer>
				</div>
			</aside>
		</main>
	);
}
