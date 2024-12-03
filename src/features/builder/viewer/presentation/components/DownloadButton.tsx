'use client';

import React from 'react';
import { printPdfAction } from '~/app/actions/print-pdf.action';
import { Button } from '~/features/shared/presentation/components/ui/button/button';

const DownloadButton = ({ resumeId }: { resumeId: string }) => {
	const onDownloadClick = async () => {
		await printPdfAction(resumeId);
	};

	return (
		<Button className="absolute right-5 top-5" onClick={onDownloadClick}>
			Download
		</Button>
	);
};

export default DownloadButton;
