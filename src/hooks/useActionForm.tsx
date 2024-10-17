import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Either, errorResponse, isError } from '~/lib/utils/either';

type UseActionFormInput = {
	action: (formData: FormData) => Promise<Either<string, string>>;
	canSubmit: boolean;
	successRoute?: string;
};

export const useActionForm = ({ action, successRoute, canSubmit }: UseActionFormInput) => {
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationFn: async (formData: FormData) => {
			if (!canSubmit) return errorResponse('Credentials are not valid');

			return await action(formData);
		},
		onSuccess: data => {
			if (isError(data)) {
				toast.error(data.error);
			} else {
				toast.success(data.success);

				if (successRoute) router.push(successRoute);
			}
		},
	});

	return {
		handleSubmit: mutate,
		isPending,
	};
};
