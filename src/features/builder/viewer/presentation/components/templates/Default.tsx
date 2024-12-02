import { ResumePresenter } from '../../presenter/resume.presenter';
import { Link, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Default = ({ resume }: { resume: ResumePresenter }) => {
	return (
		<article className="box-content flex h-max min-h-[842px] w-[595px] flex-col gap-5 bg-white p-10 text-black">
			<section id="basic-info" className="relative flex flex-col gap-1">
				<h1 className="text-2xl font-bold text-stone-900">{resume.basicInfo.fullName}</h1>
				<p className="-mt-2 text-lg">{resume.basicInfo.headline}</p>
				<div className="flex w-full items-center gap-2">
					<span className="flex items-center gap-1 text-xs">
						<Mail size={14} />
						{resume.basicInfo.email}
					</span>
					<span className="flex items-center gap-1 text-xs">
						<Phone size={14} />
						{resume.basicInfo.phone}
					</span>
					<span className="flex items-center gap-1 text-xs">
						<MapPin size={14} />
						{resume.basicInfo.location}
					</span>
				</div>
				<span className="flex items-center gap-1 text-xs">
					<Link size={14} />
					{resume.basicInfo.website}
				</span>
				{resume.basicInfo.imageUrl && (
					<Image
						src={resume.basicInfo.imageUrl}
						alt="resume-image"
						className="absolute right-0 size-[100px] rounded-lg"
						width={300}
						height={300}
					/>
				)}
			</section>
			<section id="summary" className="relative flex flex-col gap-1">
				<h2 className="text-xl font-semibold text-stone-800">Summary</h2>
				<div
					className="w-full text-xs"
					dangerouslySetInnerHTML={{ __html: resume.summaryInfo.summary }}></div>
			</section>
			<section id="experience" className="relative flex flex-col gap-1">
				<h2 className="text-xl font-semibold text-stone-800">Experience</h2>
				{resume.experienceInfo
					.sort((a, b) => a.sortOrder - b.sortOrder)
					.map(experience => (
						<div className="relative mt-2" key={experience.id}>
							<h3 className="text-md font-semibold text-stone-800">
								{experience.company}
							</h3>
							<h4 className="text-sm">{experience.role}</h4>
							<div
								className="mt-2 w-full text-xs"
								dangerouslySetInnerHTML={{ __html: experience.description }}></div>
							<div className="absolute right-0 top-1 flex items-center gap-2">
								<span className="text-xs">{experience.startDate}</span>
								<span className="text-xs">{experience.endDate}</span>
							</div>
						</div>
					))}
			</section>
			<section id="experience" className="relative flex flex-col gap-1">
				<h2 className="text-xl font-semibold text-stone-800">Education</h2>
				{resume.educationInfo
					.sort((a, b) => a.sortOrder - b.sortOrder)
					.map(education => (
						<div className="relative mt-2" key={education.id}>
							<h3 className="text-md font-semibold text-stone-800">
								{education.institution}
							</h3>
							<h4 className="text-sm">{education.study}</h4>
							<div
								className="mt-2 w-full px-2 text-xs"
								dangerouslySetInnerHTML={{ __html: education.description }}></div>
							<div className="absolute right-0 top-1 flex items-center gap-2">
								<span className="text-xs">{education.startDate}</span>
								<span className="text-xs">{education.endDate}</span>
							</div>
						</div>
					))}
			</section>
			<section id="skills">
				<h2 className="text-xl font-semibold text-stone-800">Skills</h2>
				<div className="mt-2 flex w-full flex-wrap items-center gap-3 text-xs">
					{resume.skillInfo
						.sort((a, b) => a.sortOrder - b.sortOrder)
						.map(skill => (
							<span className="rounded-xl bg-stone-200 px-3 py-1" key={skill.id}>
								{skill.name}
							</span>
						))}
				</div>
			</section>
			<section id="languages">
				<h2 className="text-xl font-semibold text-stone-800">Languages</h2>
				<div className="mt-2 flex w-full flex-wrap items-center gap-3 text-xs">
					{resume.languageInfo
						.sort((a, b) => a.sortOrder - b.sortOrder)
						.map(lang => (
							<span className="rounded-xl bg-stone-200 px-3 py-1" key={lang.id}>
								{lang.language}
							</span>
						))}
				</div>
			</section>
		</article>
	);
};

export default Default;
