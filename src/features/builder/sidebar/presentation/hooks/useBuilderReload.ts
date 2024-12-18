import { useRouter, useSearchParams } from 'next/navigation';

export const useBuilderReload = () => {
	const router = useRouter();
	const params = useSearchParams();

	return {
		update: (resumeId: string) => {
			const opened = params.get('opened');
			const section = params.get('section');
			const reload = params.get('reload');

			router.push(
				`/builder/${resumeId}?section=${section}&opened=${opened}&reload=${Number(reload) + 1}`
			);
		},
	};
};
