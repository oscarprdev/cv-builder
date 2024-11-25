import { z } from 'zod';
import { Either } from '~/lib/utils/either';

export type AuthFormProps = {
	action: (values: z.infer<typeof authSchema>) => Promise<Either<string, string>>;
	header: string;
	subHeader: string;
	submitText: string;
	successRoute: string;
};

export const LENTGH_ERROR_MESSAGE = 'Must be at least 8 characters';
export const CHARACTERS_ERROR_MESSAGE = 'Must contain one special character';

export const authSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: LENTGH_ERROR_MESSAGE })
		.regex(/[!@#$%^&*(),.?":{}|<>]/, { message: CHARACTERS_ERROR_MESSAGE }),
});
