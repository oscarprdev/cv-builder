import Builder from '~/features/builder/presentation/page/BuilderPage';

export default async function BuilderPage({ params }: { params: { id: string } }) {
	return <Builder resumeId={params.id} />;
}
