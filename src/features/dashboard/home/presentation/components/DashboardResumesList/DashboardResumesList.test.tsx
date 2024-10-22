import { DashboardResumesList } from './DashboardResumesList';
import { render, screen } from '@testing-library/react';
import { MockInstance, beforeEach, describe, it, vi } from 'vitest';
import { ListResumesDto } from '~/features/dashboard/home/application/list-resumes/list-resumes.dto';
import { IListResumesUseCase } from '~/features/dashboard/home/application/list-resumes/list-resumes.usecase';
import { Enums } from '~/features/shared/models/resume.model';
import { errorResponse, successResponse } from '~/lib/utils/either';

class MockListResumesUsecase implements IListResumesUseCase {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async execute(input: ListResumesDto) {
		return successResponse([]);
	}
}

describe('DashboardResumesList', () => {
	let usecase: IListResumesUseCase;
	let spyListResumesUsecaseExecute: MockInstance;

	beforeEach(() => {
		usecase = new MockListResumesUsecase();
		spyListResumesUsecaseExecute = vi.spyOn(usecase, 'execute');
	});

	it('should render successfuly', async () => {
		const resumesItems = [
			{
				id: '1',
				basicInfo: { name: 'John Doe', headline: 'Senior Developer' },
				resumeMeta: { theme: Enums.resumeTheme.DEFAULT },
			},
		];
		spyListResumesUsecaseExecute.mockImplementationOnce(() => successResponse(resumesItems));
		render(await DashboardResumesList({ userId: '1', usecase }));

		screen.getByTestId('resume-card-link');
		screen.getByTestId('default-resume-card');
	});

	it('should render error successfuly', async () => {
		spyListResumesUsecaseExecute.mockImplementationOnce(() =>
			errorResponse('Error listing resumes')
		);
		render(await DashboardResumesList({ userId: '1', usecase }));

		screen.getByTestId('error-resume-card');
	});
});
