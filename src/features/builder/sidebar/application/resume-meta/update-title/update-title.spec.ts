import { UpdateTitlePayload } from '../../../shared/types';
import { UpdateTitleDto } from './update-title.dto';
import { UpdateTitlePort } from './update-title.ports';
import { IUpdateTitleUseCase, UpdateTitleUseCase } from './update-title.usecase';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { Enums } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

class MockUpdateTitleRepository implements UpdateTitlePort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async updateSummaryTitle(input: UpdateTitlePayload): Promise<void> {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async updateEducationTitle(input: UpdateTitlePayload): Promise<void> {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async updateExperienceTitle(input: UpdateTitlePayload): Promise<void> {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async updateSkillsTitle(input: UpdateTitlePayload): Promise<void> {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async updateLanguagesTitle(input: UpdateTitlePayload): Promise<void> {
		return;
	}
}

describe('Update title usecase', () => {
	let usecase: IUpdateTitleUseCase;
	const spyMap: Record<keyof typeof Enums.resumeSection, MockInstance> = {
		SUMMARY: vi.spyOn(MockUpdateTitleRepository.prototype, 'updateSummaryTitle'),
		EDUCATION: vi.spyOn(MockUpdateTitleRepository.prototype, 'updateEducationTitle'),
		EXPERIENCE: vi.spyOn(MockUpdateTitleRepository.prototype, 'updateExperienceTitle'),
		SKILLS: vi.spyOn(MockUpdateTitleRepository.prototype, 'updateSkillsTitle'),
		LANGUAGES: vi.spyOn(MockUpdateTitleRepository.prototype, 'updateLanguagesTitle'),
	};

	beforeEach(() => {
		const repository = new MockUpdateTitleRepository();
		usecase = new UpdateTitleUseCase(repository);
	});

	Object.values(Enums.resumeSection).forEach(section => {
		it(`Should update the title from ${section} successfully`, async () => {
			spyMap[section].mockImplementationOnce(() => Promise.resolve());

			const input = {
				resumeId: 'resumeId',
				title: 'title',
				kind: section,
			};

			const response = await usecase.execute(input);
			if (isError(response)) return;

			expect(response.success).toBe('Title updated successfully');
		});

		it(`Should return error message if request is invalid`, async () => {
			spyMap[section].mockImplementationOnce(() => Promise.reject());

			const input = {
				resumeId: 'resumeId',
				title: 'title',
				kind: section,
			};

			const response = await usecase.execute(input);
			if (!isError(response)) return;

			expect(response.error).toBe('Error updating title');
		});

		it(`Should return error message if kind is not valid`, async () => {
			spyMap[section].mockImplementationOnce(() => Promise.reject());

			const input = {
				resumeId: 'resumeId',
				title: 'title',
				kind: 'no-valid',
			} as unknown as UpdateTitleDto;

			const response = await usecase.execute(input);
			if (!isError(response)) return;

			expect(response.error).toBe(
				"Invalid input: Invalid enum value. Expected 'SUMMARY' | 'EXPERIENCE' | 'EDUCATION' | 'LANGUAGES' | 'SKILLS', received 'no-valid'"
			);
		});
	});
});
