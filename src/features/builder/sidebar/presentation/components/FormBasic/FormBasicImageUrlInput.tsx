'use client';

import Image from 'next/image';
import React, { ChangeEvent, MouseEvent, useRef } from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { cn } from '~/lib/utils/cn';

const DEFAULT_IMAGE_URL = 'https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/default-image.jpeg';

const FormBasicImageUrlInput = ({
	isPending,
	imageUrl,
	onInputChange,
}: {
	isPending: boolean;
	imageUrl: string | null;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	const inputFileRef = useRef<HTMLInputElement>(null);

	const onBrowseImage = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.preventDefault();
		inputFileRef.current?.click();
	};

	const onRemoveImage = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.preventDefault();
		if (inputFileRef.current?.value) {
			inputFileRef.current.value = '';
			onInputChange({
				target: { name: 'imageUrl', value: null, validity: { valid: true } },
			} as unknown as ChangeEvent<HTMLInputElement>);
		}
	};
	return (
		<article className="flex items-center gap-2">
			<Image
				src={imageUrl || DEFAULT_IMAGE_URL}
				alt="Resume image"
				width={500}
				height={500}
				className={cn(
					!imageUrl ? 'opacity-80' : 'opacity-100',
					'size-[90px] rounded-full border border-input shadow-md'
				)}
			/>
			<Button variant={'secondary'} onClick={onBrowseImage} className="ml-2">
				Browse image
			</Button>
			<Button variant={'ghost'} onClick={onRemoveImage}>
				Remove
			</Button>
			<input
				hidden
				ref={inputFileRef}
				disabled={isPending}
				accept="image/png, image/jpeg, image/webp"
				id="imageUrl"
				type="file"
				name="imageUrl"
				onChange={onInputChange}
			/>
		</article>
	);
};

export default FormBasicImageUrlInput;
