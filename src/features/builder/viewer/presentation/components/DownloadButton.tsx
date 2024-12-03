'use client';

import React from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';

const DownloadButton = ({ resumeId }: { resumeId: string }) => {
	const onDownloadClick = async () => {
		const response = await fetch('http://localhost:8080/print', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				origin: 'https://cv-builder-teal.vercel.app',
				'ALLOW-CONTROL-ALLOW-ORIGIN': '*',
				'ACCESS-CONTROL-ALLOW-ORIGIN': '*',
				'ACCESS-CONTROL-ALLOW-METHODS': 'GET, POST, OPTIONS',
				'ACCESS-CONTROL-ALLOW-HEADERS': '*',
			},
			body: JSON.stringify({
				resumeId,
			}),
		});
		const data = await response.json();

		const url = data.url;
		const a = document.createElement('a');
		a.target = '_blank';
		a.href = url;
		a.download = 'resume.pdf';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		console.log(data);
	};

	return (
		<Button className="absolute right-5 top-5" onClick={onDownloadClick}>
			Download
		</Button>
	);
};

export default DownloadButton;
