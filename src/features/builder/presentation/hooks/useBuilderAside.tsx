import { useMemo, useState } from 'react';

const sectionsShowed: Record<string, boolean> = {
	basic: true,
	summary: false,
	experience: false,
	education: false,
	skills: false,
	languages: false,
};

export const useBuilderAside = () => {
	const [asideOpened, setAsideOpened] = useState(true);
	const [showSection, setShowSection] = useState(sectionsShowed);

	const sectionShowed = useMemo(() => {
		return Object.keys(showSection).find(key => showSection[key]);
	}, [showSection]);

	const onShowSection = (section: keyof typeof sectionsShowed) => {
		setShowSection(prevSections => {
			return Object.keys(prevSections).reduce(
				(acc, key) => {
					acc[key] = key === section;
					return acc;
				},
				{} as Record<string, boolean>
			);
		});
	};

	const onToggleAside = () => {
		setAsideOpened(!asideOpened);
	};

	return {
		sectionShowed,
		asideOpened,
		onShowSection,
		onToggleAside,
	};
};
