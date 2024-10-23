'use client';

import { useBuilderAside } from '../../hooks/useBuilderAside';
import BuilderAsideForms from '../BuilderAsideForms/BuilderAsideForms';
import BuilderAsideNav from '../BuilderAsideNav/BuilderAsideNav';
import { PanelLeft, Sparkle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { cn } from '~/lib/utils/cn';

const BuilderAside = ({ basicInfo }: { basicInfo: ResumeBasicInfoModel }) => {
	const { asideOpened, sectionShowed, onShowSection, onToggleAside } = useBuilderAside();

	return (
		<aside
			data-testid="builder-aside"
			className={cn(
				asideOpened ? 'h-screen w-[500px]' : 'w-[50px]',
				'relative flex flex-col bg-background-light p-2 duration-200'
			)}>
			<AsideHeader asideOpened={asideOpened} />
			<AsideTrigger asideOpened={asideOpened} onToggleAside={onToggleAside} />
			<div className="relative h-full w-full">
				<BuilderAsideNav sectionShowed={sectionShowed} onShowSection={onShowSection} />
				<BuilderAsideForms
					sectionShowed={sectionShowed}
					asideOpened={asideOpened}
					basicInfo={basicInfo}
				/>
			</div>
		</aside>
	);
};

const AsideTrigger = ({
	asideOpened,
	onToggleAside,
}: {
	asideOpened: boolean;
	onToggleAside: () => void;
}) => {
	return (
		<div className={cn(asideOpened ? '-right-14' : '-right-10', 'absolute top-2 flex w-full')}>
			<Button
				data-testid="aside-trigger"
				onClick={onToggleAside}
				variant={'link'}
				className="group ml-auto">
				<PanelLeft
					data-testid="aside-trigger-icon"
					size={22}
					className="text-muted duration-200 group-hover:text-white"
				/>
			</Button>
		</div>
	);
};

const AsideHeader = ({ asideOpened }: { asideOpened: boolean }) => {
	return (
		<Link href={'/dashboard'} className="flex items-center gap-1 p-[0.45rem] font-bold italic">
			<Sparkle
				data-testid="aside-header-icon"
				size={18}
				className={cn(asideOpened ? 'rotate-90' : 'rotate-0', 'text-accent duration-200')}
			/>
		</Link>
	);
};

export default BuilderAside;
