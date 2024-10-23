import { Briefcase, DraftingCompass, GraduationCap, Languages, Text, User } from 'lucide-react';
import React from 'react';
import AsideTooltip from '~/features/builder/presentation/components/AsideTooltip/AsideTooltip';

const BuilderAsideNav = ({
	sectionShowed,
	onShowSection,
}: {
	sectionShowed?: string;
	onShowSection: (section: string) => void;
}) => {
	return (
		<nav
			data-testid="aside-nav"
			className="absolute z-10 flex h-[80px] w-fit items-center gap-1 overflow-y-scroll bg-background-light pb-2 pt-12 sm:justify-center md:h-full md:flex-col md:items-start md:justify-start md:pb-0 md:pt-2">
			<AsideTooltip
				section="basic"
				onShowSection={onShowSection}
				isActive={sectionShowed === 'basic' || !sectionShowed}
				icon={<User size={16} />}
				content="Basic information"
			/>
			<AsideTooltip
				section="summary"
				onShowSection={onShowSection}
				isActive={sectionShowed === 'summary'}
				icon={<Text size={16} />}
				content="Summary"
			/>
			<AsideTooltip
				section="experience"
				onShowSection={onShowSection}
				isActive={sectionShowed === 'experience'}
				icon={<Briefcase size={16} />}
				content="Experience"
			/>
			<AsideTooltip
				section="education"
				onShowSection={onShowSection}
				isActive={sectionShowed === 'education'}
				icon={<GraduationCap size={16} />}
				content="Education"
			/>
			<AsideTooltip
				section="skills"
				onShowSection={onShowSection}
				isActive={sectionShowed === 'skills'}
				icon={<DraftingCompass size={16} />}
				content="Skills"
			/>
			<AsideTooltip
				section="languages"
				onShowSection={onShowSection}
				isActive={sectionShowed === 'languages'}
				icon={<Languages size={16} />}
				content="Languages"
			/>
		</nav>
	);
};

export default BuilderAsideNav;
