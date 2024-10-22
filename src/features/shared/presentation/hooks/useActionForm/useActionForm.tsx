import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Either, errorResponse, isError } from '~/lib/utils/either';

type UseActionFormInput<T> = {
	action: (formData: FormData) => Promise<Either<string, T>>;
	canSubmit: boolean;
	onSuccessCb?: (data?: T) => void;
};

export function useActionForm<T>({ action, canSubmit, onSuccessCb }: UseActionFormInput<T>) {
	const { mutate, isPending } = useMutation({
		mutationFn: async (formData: FormData) => {
			if (!canSubmit) return errorResponse('Credentials are not valid');

			return await action(formData);
		},
		onSuccess: data => {
			if (isError(data)) {
				toast.error(data.error);
			}

			if (!isError(data) && onSuccessCb) {
				onSuccessCb(data.success);
			}
		},
	});

	return {
		handleSubmit: mutate,
		isPending,
	};
}
