'use client';

import { Button } from '../ui/button/button';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

const SubmitButton = ({
	text,
	isPending,
	disabled,
	className,
}: {
	text: string;
	isPending: boolean;
	disabled: boolean;
	className?: string;
}) => {
	return (
		<Button type="submit" disabled={disabled} className={className}>
			{isPending ? <LoaderCircle data-testid="loader-icon" className="animate-spin" /> : text}
		</Button>
	);
};

export default SubmitButton;
