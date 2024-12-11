'use client';

import { useMutation } from '@tanstack/react-query';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Either, errorResponse, isError, successResponse } from '~/lib/utils/either';

export type PrintPdfActionResponse = Either<{ message: string }, string>;

const DownloadButton = () => {
	const { mutateAsync } = useMutation({
		mutationFn: async (): Promise<PrintPdfActionResponse> => {
			try {
				const template = document.getElementById('resume-template');
				if (!template) return errorResponse({ message: 'Template not found' });

				const canvas = await html2canvas(template, {
					scale: 2,
					logging: true,
					allowTaint: true,
					useCORS: true,
					onclone: (doc: Document) => {
						const style = document.createElement('style');
						style.textContent = `
							#resume-template {
								font-family: Helvetica, sans-serif;

								picture {
									top: 10px !important;
								}

								#basic-info {
									margin-top: -1.8rem;
								}

								#editable-content {
									ul {
										list-style: none !important;
										padding-inline-start: 0.5rem !important;
									}

									.listItem {
										display: flex;
										align-items: start;
										gap: 0.4rem;
									}

									.custom-marker {
										font-size: 0.8rem;
									}
								}

								#badge {
									margin-top: 8px !important;
									padding-bottom: 12px !important;

									p {
										margin-top: -6px !important;
									}
								}

								#icon {
									position: relative !important;
									padding-left: 17px !important;

									svg {
										position: absolute !important;
										top: 9px !important;
										left: 0 !important;
										width: 12px !important;
										height: 12px !important;
									}
								}
							}
						`;

						/**
						 * Add custom marker to list items
						 */
						const resume = doc.getElementById('resume-template');
						if (!resume) return;

						const editableContents = doc.querySelectorAll(
							'#editable-content'
						) as NodeListOf<HTMLElement>;

						editableContents.forEach(editableContent => {
							const liElements = editableContent.querySelectorAll('ul li');
							liElements.forEach(liElement => {
								const marker = document.createElement('span');
								marker.classList.add('custom-marker');
								marker.textContent = '•';

								liElement.classList.add('listItem');
								liElement.prepend(marker);
							});
						});

						/**
						 * Prepare resume pages
						 */
						const maxHeightPerPage = 1037;
						const pixelsGap = 12;
						const pixelsPadding = 40;

						let totalHeight = 0;
						let isNextPage = false;

						const allSections = resume.querySelectorAll('section');
						for (let i = 0; i < allSections.length; i++) {
							const section = allSections[i];
							const currentSectionHeight = section.offsetHeight + pixelsGap;
							totalHeight += currentSectionHeight;

							if (totalHeight > maxHeightPerPage) {
								if (isNextPage) {
									const previousHeight = totalHeight - currentSectionHeight;
									const pixelsTillBottom = maxHeightPerPage - previousHeight;
									const pixelsTopGap = pixelsPadding * 3 + pixelsTillBottom;
									section.style.marginTop = `${pixelsTopGap}px`;
									break;
								}
								isNextPage = true;
							}
						}

						doc.head.appendChild(style);
					},
				});

				const imgData = canvas.toDataURL('image/png');
				const pdf = new jsPDF();
				const imgWidth = 210;
				const pageHeight = 297;
				const imgHeight = (canvas.height * imgWidth) / canvas.width;

				let heightLeft = imgHeight;
				let position = 0;

				pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
				heightLeft -= pageHeight;

				while (heightLeft >= 0) {
					position = heightLeft - imgHeight;
					pdf.addPage();
					pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
					heightLeft -= pageHeight;
				}

				pdf.save('resume.pdf');
				return successResponse('Resume downloaded successfully');
			} catch {
				return errorResponse({ message: 'Something went wrong' });
			}
		},
		onSuccess: (response: PrintPdfActionResponse) => {
			if (isError(response)) {
				toast.error(response.error.message);
				return;
			}

			toast.success(response.success);
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const onDownloadClick = async () => await mutateAsync();

	return (
		<Button className="absolute right-5 top-5" onClick={onDownloadClick}>
			Download
		</Button>
	);
};

export default DownloadButton;
