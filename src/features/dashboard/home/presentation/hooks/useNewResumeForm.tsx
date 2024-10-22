import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { createNewResumeAction } from '~/app/actions/create-new-resume.action';
import { useActionForm } from '~/features/shared/presentation/hooks/useActionForm/useActionForm';

type FormState = {
	fullName: string;
	headline: string;
	email: string;
	website: string;
	phone: string;
	location: string;
};

const initialFormState: FormState = {
	fullName: '',
	headline: '',
	email: '',
	website: '',
	phone: '',
	location: '',
};

export const useNewResumeForm = () => {
	const router = useRouter();
	const [formState, setFormState] = useState<FormState>(initialFormState);

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const isFormValid = useMemo(() => Object.values(formState).every(Boolean), [formState]);

	const { handleSubmit, isPending } = useActionForm<{ id: string }>({
		action: createNewResumeAction,
		canSubmit: isFormValid,
		onSuccessCb: data => data && router.push(`/builder/${data.id}`),
	});

	return {
		onInputChange,
		handleSubmit,
		isPending,
		isFormValid,
	};
};
