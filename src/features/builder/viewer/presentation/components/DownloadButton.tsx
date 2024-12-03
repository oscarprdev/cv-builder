'use client';

import React from 'react';
import { toast } from 'sonner';
import { printPdfAction } from '~/app/actions/print-pdf.action';
import { Button } from '~/features/shared/presentation/components/ui/button/button';

const DownloadButton = ({ resumeId }: { resumeId: string }) => {
	const onDownloadClick = async () => {
		try {
			const pdfUrl = await printPdfAction(resumeId);

			if (!pdfUrl) return toast.error('PDF not uploaded');

			const a = document.createElement('a');
			a.target = '_blank';
			a.href = pdfUrl;
			a.download = 'resume.pdf';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} catch (error) {
			console.log(error);
			toast.error('Error printing pdf');
		}
	};

	return (
		<Button className="absolute right-5 top-5" onClick={onDownloadClick}>
			Download
		</Button>
	);
};

export default DownloadButton;
