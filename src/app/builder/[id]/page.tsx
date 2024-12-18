import { redirect } from 'next/navigation';
import { auth } from '~/auth';
import Sidebar from '~/features/builder/sidebar/presentation/components/Sidebar/Sidebar';
import Viewer from '~/features/builder/viewer/presentation/components/Viewer';

export default async function BuilderPage({
	params: { id },
	searchParams: { section, opened, reload },
}: {
	params: { id: string };
	searchParams: { section: string; opened: string; reload: string };
}) {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		return redirect('/signin');
	}

	return (
		<div className="flex h-screen">
			<Sidebar
				resumeId={id}
				section={section}
				opened={opened === 'true'}
				reload={Number(reload)}
			/>
			<Viewer resumeId={id} />
		</div>
	);
}
