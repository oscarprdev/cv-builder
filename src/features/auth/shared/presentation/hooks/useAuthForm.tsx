import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useActionForm } from '~/features/shared/presentation/hooks/useActionForm/useActionForm';
import { Either } from '~/lib/utils/either';

export const useAuthForm = ({
	successRoute,
	action,
}: {
	successRoute: string;
	action: (formData: FormData) => Promise<Either<string, string>>;
}) => {
	const route = useRouter();
	const [formValidations, setFormValidations] = useState({
		password: false,
	});

	const { handleSubmit, isPending } = useActionForm({
		action,
		canSubmit: Object.values(formValidations).every(Boolean),
		onSuccessCb: () => route.push(successRoute),
	});

	const onListenPasswordValidations = (isValid: boolean) =>
		setFormValidations(prev => ({ ...prev, password: isValid }));

	return {
		onListenPasswordValidations,
		handleSubmit,
		isPending,
		formValidations,
	};
};
