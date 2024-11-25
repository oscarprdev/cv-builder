import { FormBasicFallback, FormBasicServer } from '../FormBasic/FormBasicServer';
import BuilderSection from '../BuilderSection/BuilderSection';
import ExperienceSection from '../ExperienceSection/ExperienceSection';
import { FormSummaryServer, FormSummaryFallback } from '../FormSummary/FormSummaryServer';
import { Briefcase, DraftingCompass, GraduationCap, Languages, Text, User } from 'lucide-react';
import React, { Suspense } from 'react';

const BuilderSidebarSectionsList = ({
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
				<BuilderSection opened={opened} title="Summary" icon={<Text size={20} />}>
					<Suspense fallback={<FormSummaryFallback />}>
						<FormSummaryServer resumeId={resumeId} />
					</Suspense>
				</BuilderSection>
			) : section === 'experience' ? (
				<BuilderSection opened={opened} title="Experience" icon={<Briefcase size={20} />}>
					<ExperienceSection />
				</BuilderSection>
			) : section === 'education' ? (
				<BuilderSection
					opened={opened}
					title="Education"
					icon={<GraduationCap size={20} />}>
					Education
				</BuilderSection>
			) : section === 'skills' ? (
				<BuilderSection opened={opened} title="Skills" icon={<DraftingCompass size={20} />}>
					Skills
				</BuilderSection>
			) : section === 'languages' ? (
				<BuilderSection opened={opened} title="Languages" icon={<Languages size={20} />}>
					Languages
				</BuilderSection>
			) : (
				<BuilderSection opened={opened} title="Basic" icon={<User size={20} />}>
					<Suspense fallback={<FormBasicFallback />}>
						<FormBasicServer resumeId={resumeId} />
					</Suspense>
				</BuilderSection>
			)}
		</section>
	);
};

export default BuilderSidebarSectionsList;
