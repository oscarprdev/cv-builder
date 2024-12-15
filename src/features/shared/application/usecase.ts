import { ZodError, ZodSchema } from 'zod';
import { Either, errorResponse, successResponse } from '~/lib/utils/either';

export abstract class UseCase {
	protected successResponse<E, A>(data: A): Either<E, A> {
		return successResponse(data);
	}

	protected errorResponse<A>(error: unknown, errorMessage: string): Either<string, A> {
		return errorResponse(error instanceof Error ? error.message : errorMessage);
	}

	protected parseValue<T>(kind: 'input' | 'output', schema: ZodSchema<T>, value: unknown): T {
		try {
			return schema.parse(value);
		} catch (error) {
			if (error instanceof ZodError) {
				throw new Error(`Invalid ${kind}: ` + error.errors.map(e => e.message).join(', '));
			}

			throw new Error(`Unexpected error occurred during usecase ${kind} parsing`);
		}
	}
}
