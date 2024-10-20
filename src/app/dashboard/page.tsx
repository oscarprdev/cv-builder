import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { auth } from '~/auth';
import {
	DashboardResumesList,
	FallbackDashboardResumesList,
} from '~/components/organisms/DashboardResumesList/DashboardResumesList';
import DashboardHomePage from '~/components/pages/DashboardHome/DashboardHome';
import { provideCountResumesUsecase } from '~/features/resume/count';
import { isError } from '~/lib/utils/either';

export default async function DashboardHome() {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		return redirect('/signin');
	}

	const countResumesUsecase = provideCountResumesUsecase();
	const countResponse = await countResumesUsecase.execute({
		userId,
	});

	return (
		<DashboardHomePage>
			{!isError(countResponse) && countResponse.success > 0 && (
				<Suspense fallback={<FallbackDashboardResumesList />}>
					<DashboardResumesList userId={userId} />
				</Suspense>
			)}
		</DashboardHomePage>
	);
}
