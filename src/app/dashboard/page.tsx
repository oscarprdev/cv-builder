import { redirect } from 'next/navigation';
import { auth } from '~/auth';
import DashboardHomePage from '~/features/dashboard/home/presentation/page/DashboardHome';

export default async function DashboardHome() {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		return redirect('/signin');
	}
	return <DashboardHomePage userId={userId} />;
}
