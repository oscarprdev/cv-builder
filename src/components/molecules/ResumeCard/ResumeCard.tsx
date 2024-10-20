import { CircleX, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Enums, ResumeBasicInfoModel } from '~/features/shared/models/resume.model';
import { cn } from '~/lib/utils/cn';

export type ResumeCardTheme = Enums.ResumeTheme | 'error' | 'fallback';

const themeClasses: Record<ResumeCardTheme, string> = {
	[Enums.resumeTheme.DEFAULT]:
		'bg-background duration-300 hover:border-muted-foreground hover:bg-backgroundLight hover:text-white',
	[Enums.resumeTheme.HARVARD]:
		'bg-background duration-300 hover:border-muted-foreground hover:bg-backgroundLight hover:text-white',
	['error']: 'bg-error',
	['fallback']: 'bg-backgroundLight animate-pulse',
};

const themeContent: Record<ResumeCardTheme, (basicInfo?: ResumeBasicInfoModel) => React.ReactNode> =
	{
		[Enums.resumeTheme.DEFAULT]: (basicInfo?: ResumeBasicInfoModel) => (
			<DefaultResumeCard basicInfo={basicInfo} />
		),
		[Enums.resumeTheme.HARVARD]: (basicInfo?: ResumeBasicInfoModel) => (
			<DefaultResumeCard basicInfo={basicInfo} />
		),
		['error']: () => <ErrorResumeCard />,
		['fallback']: () => <LoadingResumeCard />,
	};

const ResumeCard = ({
	theme,
	basicInfo,
}: {
	theme: ResumeCardTheme;
	basicInfo?: ResumeBasicInfoModel;
}) => {
	const commonStyles = 'h-[250px] w-[170px] rounded-md border p-3';

	const cardClassNames = cn(themeClasses[theme], commonStyles);

	return basicInfo ? (
		<Link
			data-testid="resume-card-link"
			href={`/builder/${basicInfo.resumeId}`}
			className={cardClassNames}>
			{themeContent[theme](basicInfo)}
		</Link>
	) : (
		<article className={cardClassNames}>{themeContent[theme](basicInfo)}</article>
	);
};

const DefaultResumeCard = ({ basicInfo }: { basicInfo?: ResumeBasicInfoModel }) => (
	<div data-testid="default-resume-card">{basicInfo?.headline}</div>
);

const LoadingResumeCard = () => (
	<div data-testid="loading-resume-card" className="grid size-full place-items-center">
		<LoaderCircle data-testid="loading-icon" className="animate-spin text-muted" />
	</div>
);

const ErrorResumeCard = () => (
	<div
		data-testid="error-resume-card"
		className="flex size-full flex-col items-center justify-center gap-2 text-destructive">
		<CircleX />
		<p className="text-center text-xs font-semibold">Something went wrong, try again later.</p>
	</div>
);

export default ResumeCard;
