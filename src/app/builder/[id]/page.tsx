import Builder from '~/features/builder/presentation/page/BuilderPage';

export default async function BuilderPage({ params: { id } }: { params: { id: string } }) {
	return <Builder resumeId={id} />;
}
