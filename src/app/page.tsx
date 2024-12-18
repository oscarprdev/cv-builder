import {
	IconBrandCloudflare,
	IconBrandNextjs,
	IconBrandPrisma,
	IconBrandStorybook,
	IconBrandTailwind,
	IconBrandTypescript,
} from '@tabler/icons-react';
import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Opulento } from 'uvcanvas';

function page() {
	return (
		<main className="relative flex flex-col overflow-hidden p-10">
			<section className="relative grid h-screen w-full grid-cols-8 items-center">
				<div className="absolute left-0 top-0 z-[-1] h-[200vh] w-full">
					<div className="absolute left-0 top-0 size-full bg-black/90"></div>
					<Opulento />
				</div>
				<div className="absolute left-2 top-2 mb-20 h-1/2">
					<h2 className="ml-2 mt-2 font-bold">Summo.</h2>
				</div>
				<Link
					href="https://github.com/oscarprdev/cv-builder"
					className="absolute right-2 top-2 grid w-fit place-items-center rounded-full bg-white p-1">
					<Github stroke="black" fill="black" size={18} />
				</Link>
				<div className="absolute left-10 top-1/4 ml-5 flex flex-col gap-4">
					<span className="shimmer relative -ml-3 block w-fit overflow-hidden rounded-lg p-[1px]">
						<span className="z-10 inline-block rounded-lg bg-background px-3 py-[.3rem] text-xs">
							Open Source
						</span>
					</span>
					<h1 className="w-[500px] text-balance text-[4rem] font-semibold leading-none">
						The cv builder built for the modern world.
					</h1>
				</div>

				<div className="absolute left-[55%] top-[20%] z-10 animate-fade-up opacity-0 delay-100 duration-500">
					<picture className="h-[34vw] w-[58vw] scale-[1.1] rounded-xl border-4 border-white/10 shadow-2xl">
						<Image
							src="https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/Landing-image-01.webp"
							alt="Landing image 1"
							className="ratio-[16/9] rounded-xl"
							width={1600}
							height={900}
						/>
					</picture>
				</div>
				<div className="absolute left-[45%] top-[26%] z-[9] animate-fade-up opacity-0 delay-500 duration-500">
					<picture className="h-[34vw] w-[58vw] scale-[1.1] rounded-xl border-4 border-white/10 shadow-2xl">
						<Image
							src="https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/Landing-image-02.webp"
							alt="Landing image 2"
							className="ratio-[16/9] rounded-xl"
							width={1600}
							height={900}
						/>
					</picture>
				</div>
				<span className="relative col-span-2 h-screen w-full border border-b-0 border-background-hover border-r-transparent">
					<Link
						href={'/signin'}
						className="absolute bottom-1/4 col-span-1 mt-auto flex w-full justify-between border-y border-background-hover bg-foreground p-5 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white">
						Login
						<ArrowUpRight size={18} />
					</Link>
				</span>
				<span className="col-span-2 h-screen w-full border border-b-0 border-background-hover border-r-transparent"></span>
				<span className="col-span-2 h-screen w-full border border-b-0 border-background-hover border-r-transparent"></span>
				<span className="col-span-2 h-screen w-full border border-b-0 border-background-hover"></span>
			</section>
			<section className="relative grid h-screen grid-cols-8 flex-col items-center justify-center">
				<div className="absolute top-40 ml-5 flex w-full flex-col items-center">
					<p className="text-center text-xl">
						Summo is an open-source CV builder developed in Next.js, Tailwind CSS and
						much more.
					</p>
				</div>
				<span className="relative col-span-2 grid h-screen grid-cols-2 border border-t-0 border-background-hover border-r-transparent">
					<div className="col-span-1 col-start-2 mt-56 box-border grid h-32 w-full place-items-center border border-r-0">
						<IconBrandNextjs size={38} />
					</div>
				</span>
				<span className="col-span-2 grid h-screen grid-cols-2 border border-t-0 border-background-hover border-r-transparent">
					<div className="col-span-1 mt-56 box-border grid h-32 w-full place-items-center border border-x-0">
						<IconBrandTailwind size={38} />
					</div>
					<div className="col-span-1 mt-56 box-border grid h-32 w-full place-items-center border border-r-0">
						<IconBrandTypescript size={38} />
					</div>
				</span>
				<span className="col-span-2 grid h-screen grid-cols-2 border border-t-0 border-background-hover border-r-transparent">
					<div className="col-span-1 mt-56 box-border grid h-32 w-full place-items-center border border-x-0">
						<IconBrandCloudflare size={38} />
					</div>
					<div className="col-span-1 mt-56 box-border grid h-32 w-full place-items-center border border-r-0">
						<IconBrandStorybook size={38} />
					</div>
				</span>
				<span className="col-span-2 grid h-screen w-full grid-cols-2 border border-t-0 border-background-hover">
					<div className="col-span-1 col-start-1 mt-56 box-border grid h-32 w-full place-items-center border border-l-0">
						<IconBrandPrisma size={38} />
					</div>
				</span>
			</section>
		</main>
	);
}

export default page;
