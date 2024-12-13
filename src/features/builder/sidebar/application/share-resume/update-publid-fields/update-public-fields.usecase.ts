import { UpdatePublicFieldsDto, updatePublicFieldsDto } from './update-public-fields.dto';
import { UpdatePublicFieldsPorts } from './update-public-fields.ports';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IUpdatePublicFieldsUseCase {
	execute(input: UpdatePublicFieldsDto): Promise<Either<string, string>>;
}

export class UpdatePublicFieldsUsecase extends UseCase implements IUpdatePublicFieldsUseCase {
	constructor(private readonly ports: UpdatePublicFieldsPorts) {
		super();
	}

	async execute(input: UpdatePublicFieldsDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseInput<UpdatePublicFieldsDto>(updatePublicFieldsDto, input);

			await this.ports.updatePublicFields(validInput);

			return this.successResponse('Public resume fields updated successfully');
		} catch (error: unknown) {
			return this.errorResponse(error, 'Error updating public resume fields');
		}
	}
}
