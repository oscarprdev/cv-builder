'use client';

import Image from 'next/image';
import React, { MouseEvent, useRef } from 'react';
import { DEFAULT_IMAGE_URL } from '~/features/shared/constants';
import { Button } from '~/features/shared/presentation/components/ui/button/button';

type ImageUrlInputProps = {
	isPending: boolean;
	imageUrl: string;

	onImageUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUrlInput = ({ isPending, imageUrl, onImageUrlChange }: ImageUrlInputProps) => {
	const inputFileRef = useRef<HTMLInputElement>(null);

	const onBrowseImage = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.preventDefault();
		inputFileRef.current?.click();
	};

	const onRemoveImage = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.preventDefault();
		if (inputFileRef.current?.value) {
			inputFileRef.current.value = '';
		}

		onImageUrlChange({
			target: { name: 'imageUrl', value: DEFAULT_IMAGE_URL, validity: { valid: true } },
		} as unknown as React.ChangeEvent<HTMLInputElement>);
	};

	return (
		<article className="flex items-center gap-2">
			<Image
				src={imageUrl}
				alt="Resume image"
				priority
				width={500}
				height={500}
				className={'size-[90px] rounded-full border border-input shadow-md'}
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
				id="imageFile"
				type="file"
				name="imageFile"
				onChange={onImageUrlChange}
			/>
		</article>
	);
};

export default ImageUrlInput;
