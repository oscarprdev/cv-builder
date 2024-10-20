import { provideDetailResumeUsecase } from '~/features/resume/detail';
import { isError } from '~/lib/utils/either';

export default async function BuilderPage({ params }: { params: { id: string } }) {
	const resumeUsecase = provideDetailResumeUsecase();
	const response = await resumeUsecase.execute({ resumeId: params.id });

	if (isError(response)) {
		return (
			<section className="grid size-full place-items-center text-sm text-destructive">
				Error: {response.error}
			</section>
		);
	}

	return <div>Builder Page: {JSON.stringify(response.success)}</div>;
}
