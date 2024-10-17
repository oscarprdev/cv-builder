'use client';

import { Button } from '../../atoms/button/button';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

const SubmitButton = ({
	text,
	isPending,
	disabled,
}: {
	text: string;
	isPending: boolean;
	disabled: boolean;
}) => {
	return (
		<Button type="submit" disabled={disabled}>
			{isPending ? <LoaderCircle data-testid="loader-icon" className="animate-spin" /> : text}
		</Button>
	);
};

export default SubmitButton;
