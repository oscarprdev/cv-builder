import { UpdateResumeSummaryPayload } from '../../shared/types';
import prisma from '~/lib/prisma/db';

export interface IUpdateResumeSummaryInfra {
	update(payload: UpdateResumeSummaryPayload): Promise<void>;
}

export class UpdateResumeSummaryInfra implements IUpdateResumeSummaryInfra {
	async update(payload: UpdateResumeSummaryPayload): Promise<void> {
		try {
			const summaryCreated = await this.findSummary(payload.resumeId);

			if (!summaryCreated) {
				await this.create(payload.resumeId, payload.summary);
			} else {
				await prisma.resume.update({
					where: {
						id: payload.resumeId,
					},
					data: {
						summaryInfo: {
							update: {
								summary: payload.summary,
							},
						},
					},
				});
			}
		} catch {
			throw new Error('Error in infra updating resume summary');
		}
	}

	private async findSummary(resumeId: string) {
		return await prisma.resumeSummaryInformation.findUnique({
			where: {
				resumeId,
			},
		});
	}

	private async create(resumeId: string, summary: string) {
		await prisma.resumeSummaryInformation.create({
			data: {
				resumeId,
				summary,
			},
		});
	}
}
