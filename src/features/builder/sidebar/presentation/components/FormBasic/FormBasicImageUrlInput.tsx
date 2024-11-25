'use client';

import Image from 'next/image';
import React, { MouseEvent, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { DEFAULT_IMAGE_URL } from '~/features/shared/constants';
import { Button } from '~/features/shared/presentation/components/ui/button/button';

type FormBasicImageUrlInputProps = {
	isPending: boolean;
	imageUrl: string;
	register: UseFormRegisterReturn<'imageFile'>;
	onImageUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormBasicImageUrlInput = ({
	isPending,
	imageUrl,
	register,
	onImageUrlChange,
}: FormBasicImageUrlInputProps) => {
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
				{...register}
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

export default FormBasicImageUrlInput;
