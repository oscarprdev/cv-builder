// import Builder from '~/features/builder/old/presentation/page/BuilderPage';
import BuilderSidebar from '~/features/builder/sidebar/presentation/components/BuilderSidebar/BuilderSidebar';

export default async function BuilderPage({
	params: { id },
	searchParams: { section, opened },
}: {
	params: { id: string };
	searchParams: { section: string; opened: string };
}) {
	return <BuilderSidebar resumeId={id} section={section} opened={opened === 'true'} />;
}
