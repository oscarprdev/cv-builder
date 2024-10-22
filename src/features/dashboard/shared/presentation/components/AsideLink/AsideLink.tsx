'use client';

import { CircleHelp, House, Mails, ScanSearch, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { cn } from '~/lib/utils/cn';

const linksMap: Record<string, React.ReactNode> = {
	['/dashboard']: <House data-testid="dashboard-icon" size={18} className="hidden md:block" />,
	['/dashboard/settings']: (
		<Settings data-testid="settings-icon" size={18} className="hidden md:block" />
	),
	['/dashboard/support']: (
		<CircleHelp data-testid="support-icon" size={18} className="hidden md:block" />
	),
	['/dashboard/feed']: (
		<ScanSearch data-testid="feed-icon" size={18} className="hidden md:block" />
	),
	['/dashboard/messages']: (
		<Mails data-testid="messages-icon" size={18} className="hidden md:block" />
	),
};

const AsideLink = ({ href, label }: { href: string; label: string }) => {
	const pathname = usePathname();
	const isActive = useMemo(() => pathname === href, [pathname, href]);

	return (
		<Link
			href={href}
			className={cn(
				isActive
					? 'bg-background-hover font-bold text-white'
					: 'bg-transparent text-muted hover:text-white',
				'flex items-center gap-2 rounded-md px-2 py-1 duration-300 md:w-full md:p-2'
			)}>
			{linksMap[href]}
			<label className="block cursor-pointer text-sm lg:block">{label}</label>
		</Link>
	);
};

export default AsideLink;
