// import Builder from '~/features/builder/old/presentation/page/BuilderPage';
import Sidebar from '~/features/builder/sidebar/presentation/components/Sidebar/Sidebar';

export default async function BuilderPage({
	params: { id },
	searchParams: { section, opened },
}: {
	params: { id: string };
	searchParams: { section: string; opened: string };
}) {
	return <Sidebar resumeId={id} section={section} opened={opened === 'true'} />;
}
