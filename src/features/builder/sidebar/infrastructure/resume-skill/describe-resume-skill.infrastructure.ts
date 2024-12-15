import { DescribeResumeSkillsInfraOutput } from './resume-skill.types';
import prisma from '~/lib/prisma/db';

export interface IDescribeResumeSkillInfra {
	describe(input: { resumeId: string }): Promise<DescribeResumeSkillsInfraOutput | null>;
}

export class DescribeResumeSkillInfra implements IDescribeResumeSkillInfra {
	constructor() {}

	async describe(input: { resumeId: string }): Promise<DescribeResumeSkillsInfraOutput | null> {
		const response = await prisma.resume.findUnique({
			where: {
				id: input.resumeId,
			},
			include: {
				skillInfo: true,
				resumeMeta: true,
			},
		});

		return response;
	}
}
