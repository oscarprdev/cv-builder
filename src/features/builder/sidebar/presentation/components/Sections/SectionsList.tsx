import EducationSection from './Education/EducationSection';
import LanguageSection from './Language/LanguageSection';
import SettingsSection from './Settings/SettingsSection';
import SkillSection from './Skill/SkillSection';
import {
	Briefcase,
	DraftingCompass,
	GraduationCap,
	Languages,
	Palette,
	Text,
	Usb,
	User,
} from 'lucide-react';
import React, { Suspense } from 'react';
import {
	BasicSection,
	BasicSectionFallback,
} from '~/features/builder/sidebar/presentation/components/Sections/Basic/BasicSection';
import ExperienceSection from '~/features/builder/sidebar/presentation/components/Sections/Experience/ExperienceSection';
import SectionContainer from '~/features/builder/sidebar/presentation/components/Sections/SectionContainer';
import {
	SummarySection,
	SummarySectionFallback,
} from '~/features/builder/sidebar/presentation/components/Sections/Summary/SummarySection';

const SectionsList = ({
	resumeId,
	section,
	opened,
	reload,
}: {
	resumeId: string;
	section: string;
	opened: boolean;
	reload: number;
}) => {
	return (
		<section data-testid="aside-forms-container" className="w-full flex-col p-5">
			{section === 'basic' ? (
				<SectionContainer opened={opened} title="Basic" icon={<User size={20} />}>
					<Suspense key={crypto.randomUUID()} fallback={<BasicSectionFallback />}>
						<BasicSection resumeId={resumeId} />
					</Suspense>
				</SectionContainer>
			) : section === 'summary' ? (
				<SectionContainer opened={opened} title="Summary" icon={<Text size={20} />}>
					<Suspense key={crypto.randomUUID()} fallback={<SummarySectionFallback />}>
						<SummarySection resumeId={resumeId} />
					</Suspense>
				</SectionContainer>
			) : section === 'experience' ? (
				<SectionContainer opened={opened} title="Experience" icon={<Briefcase size={20} />}>
					<Suspense key={reload} fallback={<p>Loading...</p>}>
						<ExperienceSection resumeId={resumeId} />
					</Suspense>
				</SectionContainer>
			) : section === 'education' ? (
				<SectionContainer
					opened={opened}
					title="Education"
					icon={<GraduationCap size={20} />}>
					<Suspense key={reload} fallback={<p>Loading...</p>}>
						<EducationSection resumeId={resumeId} />
					</Suspense>
				</SectionContainer>
			) : section === 'skills' ? (
				<SectionContainer
					opened={opened}
					title="Skills"
					icon={<DraftingCompass size={20} />}>
					<Suspense key={reload} fallback={<p>Loading...</p>}>
						<SkillSection resumeId={resumeId} />
					</Suspense>
				</SectionContainer>
			) : section === 'languages' ? (
				<SectionContainer opened={opened} title="Languages" icon={<Languages size={20} />}>
					<Suspense key={reload} fallback={<p>Loading...</p>}>
						<LanguageSection resumeId={resumeId} />
					</Suspense>
				</SectionContainer>
			) : section === 'themes' ? (
				<SectionContainer opened={opened} title="Themes" icon={<Palette size={20} />}>
					<p>Coming soon...</p>
				</SectionContainer>
			) : (
				<SectionContainer opened={opened} title="Settings" icon={<Usb size={20} />}>
					<SettingsSection resumeId={resumeId} />
				</SectionContainer>
			)}
		</section>
	);
};

export default SectionsList;
