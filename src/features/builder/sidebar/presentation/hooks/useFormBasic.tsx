import { ResumeBasicPresenter, resumeBasicPresenterDto } from '../presenter/resume-basic.presenter';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useActionForm } from '~/features/shared/presentation/hooks/useActionForm/useActionForm';
import { Either } from '~/lib/utils/either';

export const useFormBasic = ({
	action,
	defaultValues,
}: {
	action: (formData: FormData) => Promise<Either<string, string>>;
	defaultValues: ResumeBasicPresenter;
}) => {
	const [formState, setFormState] = useState(defaultValues);

	const canSubmit = useMemo(
		() => resumeBasicPresenterDto.safeParse(formState).success,
		[formState]
	);

	const { handleSubmit, isPending } = useActionForm({
		action,
		canSubmit,
		onSuccessCb: (data?: string | undefined) =>
			toast.success(data || 'Basic info updated successfully'),
	});

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormState(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	return {
		handleSubmit,
		onInputChange,
		isPending,
		isFormValid: canSubmit,
	};
};
