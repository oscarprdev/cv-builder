import Builder from '~/features/builder/presentation/page/BuilderPage';

export default async function BuilderPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return <Builder resumeId={id} />;
}
