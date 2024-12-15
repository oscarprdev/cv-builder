import { UpdateResumeBasicDto, updateResumeBasicDto } from './update-resume-basic.dto';
import { UpdateResumeBasicPort } from './update-resume-basic.port';
import { UseCase } from '~/features/shared/application/usecase';
import { Either } from '~/lib/utils/either';

export interface IUpdateResumeBasicUseCase {
	execute(input: UpdateResumeBasicDto): Promise<Either<string, string>>;
}

export class UpdateResumeBasicUseCase extends UseCase implements IUpdateResumeBasicUseCase {
	constructor(private readonly ports: UpdateResumeBasicPort) {
		super();
	}

	async execute(input: UpdateResumeBasicDto): Promise<Either<string, string>> {
		try {
			const { imageFile, imageUrl, ...validInput } = this.parseValue<UpdateResumeBasicDto>(
				'input',
				updateResumeBasicDto,
				input
			);

			let imageUrlToUpdate = null;

			if (imageUrl && imageFile && imageFile.size > 0) {
				imageUrlToUpdate = await this.deleteAndUploadImage(imageFile, validInput.resumeId);
			}

			await this.updateResumeBasic(validInput, imageUrlToUpdate || imageUrl);

			return this.successResponse('Resume basic updated successfully');
		} catch (error) {
			return this.errorResponse(error, 'Error updating resume basic');
		}
	}

	private async updateResumeBasic(
		validInput: Omit<UpdateResumeBasicDto, 'imageFile' | 'imageUrl'>,
		imageUrl: string | null
	) {
		await this.ports.update({
			...validInput,
			imageUrl,
		});
	}

	private async deleteAndUploadImage(imageFile: File, resumeId: string) {
		const [result] = await Promise.all([
			this.uploadImage(imageFile, resumeId),
			this.ports.deleteImage(resumeId),
		]);

		return result;
	}

	private async uploadImage(imageFile: File, resumeId: string): Promise<string> {
		const imageId = await this.ports.uploadImage(
			imageFile,
			resumeId,
			`basic-${imageFile.name}`
		);

		return this.mapImageId(imageId);
	}

	private mapImageId(imageId: string) {
		return `https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/${imageId}`;
	}
}
