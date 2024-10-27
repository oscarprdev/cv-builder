import { UpdateResumeBasicUseCase } from '~/features/builder/sidebar/application/resume-basic/update/update-resume-basic.usecase';
import { UpdateResumeBasicInfra } from '~/features/builder/sidebar/infrastructure/resume-basic/update-resume-basic.infrastructure';
import { UpdateResumeBasicRepository } from '~/features/builder/sidebar/repository/resume-basic/update-resume-basic.repository';
import { BucketClient } from '~/lib/bucket/bucket.client';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export const BUCKET_URL = process.env.S3_API_URL || '';
export const BUCKET_KEY_ID = process.env.S3_ACCESS_KEY_ID || '';
export const BUCKET_ACCES_KEY = process.env.S3_SECRET_ACCESS_KEY || '';
export const BUCKET_NAME = process.env.BUCKET || '';

export const provideUpdateResumeBasicUsecase = () => {
	const bucketClient = new BucketClient(BUCKET_URL, BUCKET_KEY_ID, BUCKET_ACCES_KEY, BUCKET_NAME);
	const resumeClient = new ResumeClient();
	const infra = new UpdateResumeBasicInfra(resumeClient, bucketClient);
	const repository = new UpdateResumeBasicRepository(infra);

	return new UpdateResumeBasicUseCase(repository);
};
