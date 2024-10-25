import { ResumeBasicPresenter, resumeBasicPresenterDto } from '../presenter/resume-basic.presenter';
import { useState } from 'react';
import { toast } from 'sonner';
import { useActionForm } from '~/features/shared/presentation/hooks/useActionForm/useActionForm';
import { Either } from '~/lib/utils/either';

const MAX_FILE_SIZE_MB = 2;

export const useFormBasic = ({
	action,
	defaultValues,
}: {
	action: (formData: FormData) => Promise<Either<string, string>>;
	defaultValues: ResumeBasicPresenter;
}) => {
	const [imageUrl, setImageUrl] = useState<{ file: File | null; type: string | null }>({
		file: null,
		type: null,
	});
	const [formState, setFormState] = useState(defaultValues);
	const [canSubmit, setCanSubmit] = useState(
		resumeBasicPresenterDto.safeParse(formState).success
	);

	const { handleSubmit, isPending } = useActionForm({
		action: (formData: FormData) => {
			if (imageUrl.file && imageUrl.type) {
				formData.append('imageUrl', imageUrl.file, imageUrl.type);
			}
			return action(formData);
		},
		canSubmit,
		onSuccessCb: (data?: string | undefined) =>
			toast.success(data || 'Basic info updated successfully'),
	});

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (
			event.target instanceof HTMLInputElement &&
			event.target.name === 'imageUrl' &&
			event.target.value
		) {
			const [file] = Array.from(event.target.files!);

			if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
				return toast.error('Image size should be less than 2MB');
			}

			setImageUrl({ file, type: file.type });
			return setFormState(prev => ({
				...prev,
				imageUrl: URL.createObjectURL(file),
			}));
		}

		setCanSubmit(event.target.validity.valid);

		setFormState(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	return {
		handleSubmit,
		onInputChange,
		formState,
		isPending,
		isFormValid: canSubmit,
	};
};
