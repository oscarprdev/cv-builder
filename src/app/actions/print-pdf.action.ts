'use server';

import { Bucket } from '@oprdev/cloudflare-r2-storage';
import chromium from '@sparticuz/chromium-min';
// import { PDFDocument } from 'pdf-lib';
import puppeteer from 'puppeteer-core';

const BUCKET_URL = process.env.S3_API_URL || '';
const BUCKET_KEY_ID = process.env.S3_ACCESS_KEY_ID || '';
const BUCKET_ACCES_KEY = process.env.S3_SECRET_ACCESS_KEY || '';
const BUCKET_NAME = process.env.BUCKET || '';
const APP_URL = process.env.APP_URL || '';

const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

export const printPdfAction = async (resumeId: string) => {
	const url = `${APP_URL}/${resumeId}`;
	const browser = await puppeteer.launch({
		args: isLocal ? puppeteer.defaultArgs() : chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath:
			process.env.CHROME_EXECUTABLE_PATH ||
			(await chromium.executablePath(
				'https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/chromium-v131.0.1-pack.tar'
			)),
		headless: chromium.headless,
	});

	const page = await browser.newPage();
	await page.goto(url);

	// const page = await browser.newPage();
	// await page.setUserAgent(
	// 	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'
	// );

	// await page.goto(url, {
	// 	waitUntil: 'networkidle2',
	// });

	// const data = await page.evaluate(() => {
	// 	const pageElement = document.getElementById('theme-app');

	// 	if (!pageElement) throw new Error('Failed to get resume viewer');

	// 	const width = pageElement?.scrollWidth ?? 0;
	// 	const height = pageElement?.scrollHeight ?? 0;

	// 	return { width, height };
	// }, page);

	// if (!data) throw new Error('Failed to get data');

	// const { width, height } = data;

	// const pagesBuffer: Buffer[] = [];

	// const uint8array = await page.pdf({ width, height, printBackground: true });
	// pagesBuffer.push(Buffer.from(uint8array));

	// const pdf = await PDFDocument.create();

	// for (const element of pagesBuffer) {
	// 	const page = await PDFDocument.load(element);
	// 	const [copiedPage] = await pdf.copyPages(page, [0]);
	// 	pdf.addPage(copiedPage);
	// }

	const screenshot = await page.screenshot();
	const bufferScreenshot = Buffer.from(screenshot);

	// const buffer = Buffer.from(await pdf.save());

	const bucket = new Bucket({
		endpoint: BUCKET_URL,
		accessKeyId: BUCKET_KEY_ID,
		secretAccessKey: BUCKET_ACCES_KEY,
		bucketName: BUCKET_NAME,
	});

	const pdfUrl = await bucket.uploadFile({
		id: 'test-img',
		file: bufferScreenshot,
		contentType: 'type/png',
		project: 'test-id',
	});

	await page.close();
	await browser.disconnect();

	return `https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/${pdfUrl}`;
};
