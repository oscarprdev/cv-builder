import { Bucket } from '@oprdev/cloudflare-r2-storage';

export interface IBucketClient {
	upload(file: File, entityId: string, fileId: string): Promise<string>;
	findAndDelete(entityId: string): Promise<void>;
}

export class BucketClient implements IBucketClient {
	readonly bucket: Bucket;

	constructor(
		private readonly BUCKET_URL: string,
		private readonly BUCKET_KEY_ID: string,
		private readonly BUCKET_ACCES_KEY: string,
		private readonly BUCKET_NAME: string
	) {
		this.bucket = new Bucket({
			endpoint: this.BUCKET_URL,
			accessKeyId: this.BUCKET_KEY_ID,
			secretAccessKey: this.BUCKET_ACCES_KEY,
			bucketName: this.BUCKET_NAME,
		});
	}

	async upload(file: File, entityId: string, fileId: string): Promise<string> {
		const buffer = (await file.arrayBuffer()) as unknown as Buffer;

		const result = await this.bucket.uploadFile({
			id: fileId,
			file: buffer,
			contentType: file.type,
			project: entityId,
		});

		if (!result) throw new Error('Failed to upload image');

		return result;
	}

	async findAndDelete(entityId: string) {
		const imagesUploaded = await this.bucket.getKeysByEntity({ entity: entityId });

		const alreadyUploaded =
			imagesUploaded?.length && imagesUploaded?.find(imageId => imageId.match('basic'));

		if (alreadyUploaded) {
			await this.bucket.deleteItemByKey({ key: alreadyUploaded });
		}
	}
}
