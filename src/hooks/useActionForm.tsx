import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Either, errorResponse, isError } from '~/lib/utils/either';

type UseActionFormInput = {
	action: (formData: FormData) => Promise<Either<string, string>>;
	successRoute: string;
	isValidated: boolean;
};

export const useActionForm = ({ action, successRoute, isValidated }: UseActionFormInput) => {
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationFn: async (formData: FormData) => {
			if (!isValidated) return errorResponse('Credentials are not valid');

			return await action(formData);
		},
		onSuccess: data => {
			if (isError(data)) {
				toast.error(data.error);
			} else {
				toast.success(data.success);
				router.push(successRoute);
			}
		},
	});

	return {
		mutate,
		isPending,
	};
};
