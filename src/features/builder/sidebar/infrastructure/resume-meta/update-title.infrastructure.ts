import { UpdateTitlePayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface IUpdateTitleInfrastructure {
	updateSummaryTitle(input: UpdateTitlePayload): Promise<void>;
	updateEducationTitle(input: UpdateTitlePayload): Promise<void>;
	updateExperienceTitle(input: UpdateTitlePayload): Promise<void>;
	updateSkillsTitle(input: UpdateTitlePayload): Promise<void>;
	updateLanguagesTitle(input: UpdateTitlePayload): Promise<void>;
}

export class UpdateTitleInfrastructure implements IUpdateTitleInfrastructure {
	constructor() {}

	async updateSummaryTitle(input: UpdateTitlePayload): Promise<void> {
		try {
			await prisma.resumeMeta.update({
				where: {
					resumeId: input.resumeId,
				},
				data: {
					summaryTitle: input.title,
				},
			});
		} catch {
			throw new Error('Infra Error updating summary title');
		}
	}

	async updateEducationTitle(input: UpdateTitlePayload): Promise<void> {
		try {
			await prisma.resumeMeta.update({
				where: {
					resumeId: input.resumeId,
				},
				data: {
					educationTitle: input.title,
				},
			});
		} catch {
			throw new Error('Infra Error updating education title');
		}
	}

	async updateExperienceTitle(input: UpdateTitlePayload): Promise<void> {
		try {
			await prisma.resumeMeta.update({
				where: {
					resumeId: input.resumeId,
				},
				data: {
					experienceTitle: input.title,
				},
			});
		} catch {
			throw new Error('Infra Error updating experience title');
		}
	}

	async updateSkillsTitle(input: UpdateTitlePayload): Promise<void> {
		try {
			await prisma.resumeMeta.update({
				where: {
					resumeId: input.resumeId,
				},
				data: {
					skillsTitle: input.title,
				},
			});
		} catch {
			throw new Error('Infra Error updating skills title');
		}
	}

	async updateLanguagesTitle(input: UpdateTitlePayload): Promise<void> {
		try {
			await prisma.resumeMeta.update({
				where: {
					resumeId: input.resumeId,
				},
				data: {
					languagesTitle: input.title,
				},
			});
		} catch {
			throw new Error('Infra Error updating languages title');
		}
	}
}
