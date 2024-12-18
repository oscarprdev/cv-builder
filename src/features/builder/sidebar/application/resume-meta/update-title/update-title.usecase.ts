import { UpdateTitleDto, updateTitleDto } from './update-title.dto';
import { UpdateTitlePort } from './update-title.ports';
import { UseCase } from '~/features/shared/application/usecase';
import { Enums } from '~/features/shared/models/resume.model';
import { Either } from '~/lib/utils/either';

export interface IUpdateTitleUseCase {
	execute(input: UpdateTitleDto): Promise<Either<string, string>>;
}

export class UpdateTitleUseCase extends UseCase implements IUpdateTitleUseCase {
	constructor(private readonly ports: UpdateTitlePort) {
		super();
	}

	async execute(input: UpdateTitleDto): Promise<Either<string, string>> {
		try {
			const validInput = this.parseValue<UpdateTitleDto>('input', updateTitleDto, input);

			switch (validInput.kind) {
				case Enums.resumeSection.SUMMARY:
					await this.ports.updateSummaryTitle(validInput);
					break;
				case Enums.resumeSection.EDUCATION:
					await this.ports.updateEducationTitle(validInput);
					break;
				case Enums.resumeSection.EXPERIENCE:
					await this.ports.updateExperienceTitle(validInput);
					break;
				case Enums.resumeSection.LANGUAGES:
					await this.ports.updateLanguagesTitle(validInput);
					break;
				case Enums.resumeSection.SKILLS:
					await this.ports.updateSkillsTitle(validInput);
					break;
				default:
					throw new Error('Invalid resume section');
			}

			return this.successResponse('Title updated successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error updating title');
		}
	}
}
