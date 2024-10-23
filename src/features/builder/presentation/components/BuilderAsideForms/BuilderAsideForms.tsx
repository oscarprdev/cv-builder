import React from 'react';
import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';
import { cn } from '~/lib/utils/cn';

const BuilderAsideForms = ({
	asideOpened,
	sectionShowed,
	basicInfo,
}: {
	asideOpened: boolean;
	sectionShowed?: string;
	basicInfo: ResumeBasicInfoModel;
}) => {
	return (
		<section
			data-testid="aside-forms-container"
			className={cn(
				asideOpened ? 'flex w-[450px] animate-fade-right' : 'hidden',
				'ml-12 flex-col'
			)}>
			{sectionShowed === 'basic' || !sectionShowed ? (
				<p>basic: {basicInfo.email}</p>
			) : sectionShowed === 'summary' ? (
				<p>summary</p>
			) : sectionShowed === 'experience' ? (
				<p>experience</p>
			) : sectionShowed === 'education' ? (
				<p>education</p>
			) : sectionShowed === 'skills' ? (
				<p>skills</p>
			) : (
				<p>languages</p>
			)}
		</section>
	);
};

export default BuilderAsideForms;
