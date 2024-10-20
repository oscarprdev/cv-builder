import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { auth } from '~/auth';
import {
	DashboardResumesList,
	FallbackDashboardResumesList,
} from '~/components/organisms/DashboardResumesList/DashboardResumesList';
import DashboardHomePage from '~/components/pages/DashboardHome/DashboardHome';

export default async function DashboardHome() {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		return redirect('/signin');
	}

	return (
		<DashboardHomePage>
			<Suspense fallback={<FallbackDashboardResumesList />}>
				<DashboardResumesList userId={userId} />
			</Suspense>
		</DashboardHomePage>
	);
}
