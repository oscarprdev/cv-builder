import BuilderForm from '../BuilderForm/BuilderForm';
import { FormBasicServer, FormBasicServerFallback } from '../FormBasic/FormBasicServer';
import { Briefcase, DraftingCompass, GraduationCap, Languages, Text, User } from 'lucide-react';
import React, { Suspense } from 'react';

const BuilderSidebarFormsList = ({
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
				<BuilderForm opened={opened} title="Summary" icon={<Text size={20} />}>
					Summary
				</BuilderForm>
			) : section === 'experience' ? (
				<BuilderForm opened={opened} title="Experience" icon={<Briefcase size={20} />}>
					Experience
				</BuilderForm>
			) : section === 'education' ? (
				<BuilderForm opened={opened} title="Education" icon={<GraduationCap size={20} />}>
					Education
				</BuilderForm>
			) : section === 'skills' ? (
				<BuilderForm opened={opened} title="Skills" icon={<DraftingCompass size={20} />}>
					Skills
				</BuilderForm>
			) : section === 'languages' ? (
				<BuilderForm opened={opened} title="Languages" icon={<Languages size={20} />}>
					Languages
				</BuilderForm>
			) : (
				<BuilderForm opened={opened} title="Basic" icon={<User size={20} />}>
					<Suspense fallback={<FormBasicServerFallback />}>
						<FormBasicServer resumeId={resumeId} />
					</Suspense>
				</BuilderForm>
			)}
		</section>
	);
};

export default BuilderSidebarFormsList;
