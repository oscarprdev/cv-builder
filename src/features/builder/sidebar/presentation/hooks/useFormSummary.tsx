import {
	ResumeSummaryPresenter,
	resumeSummaryPresenterDto,
} from '../presenter/resume-summary.presenter';
import { useState } from 'react';
import { toast } from 'sonner';
import { useActionForm } from '~/features/shared/presentation/hooks/useActionForm/useActionForm';
import { Either } from '~/lib/utils/either';

export const useFormSummary = ({
	action,
	defaultValues,
}: {
	action: (formState: ResumeSummaryPresenter) => Promise<Either<string, string>>;
	defaultValues: ResumeSummaryPresenter;
}) => {
	const [formState, setFormState] = useState(defaultValues);
	const [canSubmit, setCanSubmit] = useState(
		resumeSummaryPresenterDto.safeParse(formState).success
	);
	const { handleSubmit, isPending } = useActionForm({
		action: () => {
			return action(formState);
		},
		canSubmit,
		onSuccessCb: (data?: string | undefined) =>
			toast.success(data || 'Basic info updated successfully'),
	});

	const onInputChange = (value: string) => {
		setCanSubmit(value.length > 0);

		setFormState(prev => ({
			...prev,
			summary: value,
		}));
	};

	return {
		isPending,
		canSubmit,
		handleSubmit,
		onInputChange,
	};
};
