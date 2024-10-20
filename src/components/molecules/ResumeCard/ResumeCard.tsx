import { CircleX, LoaderCircle } from 'lucide-react';
import React from 'react';
import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';
import { cn } from '~/lib/utils/cn';

const themeClasses: Record<string, string> = {
	['default']: 'bg-background',
	['error']: 'bg-error',
	['fallback']: 'bg-backgroundLight animate-pulse',
};

const themeContent: Record<string, (basicInfo?: ResumeBasicInfoModel) => React.ReactNode> = {
	['default']: (basicInfo?: ResumeBasicInfoModel) => <DefaultResumeCard basicInfo={basicInfo} />,
	['error']: () => <ErrorResumeCard />,
	['fallback']: () => <LoadingResumeCard />,
};

const ResumeCard = ({ theme, basicInfo }: { theme: string; basicInfo?: ResumeBasicInfoModel }) => {
	return (
		<article className={cn(themeClasses[theme], 'h-[250px] w-[170px] rounded-md border p-3')}>
			{themeContent[theme](basicInfo)}
		</article>
	);
};

const DefaultResumeCard = ({ basicInfo }: { basicInfo?: ResumeBasicInfoModel }) => (
	<div>{basicInfo?.email}</div>
);

const LoadingResumeCard = () => (
	<div className="grid size-full place-items-center">
		<LoaderCircle className="animate-spin text-muted" />
	</div>
);

const ErrorResumeCard = () => (
	<div className="flex size-full flex-col items-center justify-center gap-2 text-destructive">
		<CircleX />
		<p className="text-center text-xs font-semibold">Something went wrong, try again later.</p>
	</div>
);

export default ResumeCard;
