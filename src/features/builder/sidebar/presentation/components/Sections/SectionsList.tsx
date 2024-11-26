import { Briefcase, DraftingCompass, GraduationCap, Languages, Text, User } from 'lucide-react';
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
}: {
	resumeId: string;
	section: string;
	opened: boolean;
}) => {
	return (
		<section data-testid="aside-forms-container" className="w-full flex-col p-5">
			{section === 'summary' ? (
				<SectionContainer opened={opened} title="Summary" icon={<Text size={20} />}>
					<Suspense fallback={<SummarySectionFallback />}>
						<SummarySection resumeId={resumeId} />
					</Suspense>
				</SectionContainer>
			) : section === 'experience' ? (
				<SectionContainer opened={opened} title="Experience" icon={<Briefcase size={20} />}>
					<ExperienceSection resumeId={resumeId} />
				</SectionContainer>
			) : section === 'education' ? (
				<SectionContainer
					opened={opened}
					title="Education"
					icon={<GraduationCap size={20} />}>
					Education
				</SectionContainer>
			) : section === 'skills' ? (
				<SectionContainer
					opened={opened}
					title="Skills"
					icon={<DraftingCompass size={20} />}>
					Skills
				</SectionContainer>
			) : section === 'languages' ? (
				<SectionContainer opened={opened} title="Languages" icon={<Languages size={20} />}>
					Languages
				</SectionContainer>
			) : (
				<SectionContainer opened={opened} title="Basic" icon={<User size={20} />}>
					<Suspense fallback={<BasicSectionFallback />}>
						<BasicSection resumeId={resumeId} />
					</Suspense>
				</SectionContainer>
			)}
		</section>
	);
};

export default SectionsList;
