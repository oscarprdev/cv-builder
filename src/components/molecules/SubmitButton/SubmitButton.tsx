'use client';

import { Button } from '../../atoms/button/button';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

const SubmitButton = ({ text, isPending }: { text: string; isPending: boolean }) => {
	return (
		<Button type="submit" disabled={isPending}>
			{isPending ? <LoaderCircle data-testid="loader-icon" className="animate-spin" /> : text}
		</Button>
	);
};

export default SubmitButton;
