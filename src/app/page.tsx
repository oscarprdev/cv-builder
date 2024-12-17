import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function page() {
	return (
		<main className="relative grid h-full w-full grid-cols-8 overflow-hidden p-10">
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
			<div className="absolute -right-36 top-[20%] z-10 animate-fade-up opacity-0 delay-100 duration-500">
				<picture className="h-[28rem] w-[50rem] scale-[1.1] rounded-xl border-4 border-white/10 shadow-2xl">
					<Image
						src="https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/Landing-image-01.webp"
						alt="Landing image 1"
						className="ratio-[16/9] rounded-xl"
						width={1600}
						height={900}
					/>
				</picture>
			</div>
			<div className="absolute right-4 top-[26%] z-[9] animate-fade-up opacity-0 delay-500 duration-500">
				<picture className="h-[28rem] w-[50rem] scale-[1.1] rounded-xl border-4 border-white/10 shadow-2xl">
					<Image
						src="https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/Landing-image-02.webp"
						alt="Landing image 2"
						className="ratio-[16/9] rounded-xl"
						width={1600}
						height={900}
					/>
				</picture>
			</div>
			<section className="col-span-2 flex h-full w-full flex-col border border-background-hover border-r-transparent">
				<div className="relative h-screen">
					<div className="mb-20 h-1/2">
						<h2 className="ml-2 mt-2 font-bold">Summo.</h2>
					</div>
					<Link
						href={'/signin'}
						className="mt-auto flex w-full justify-between border-y border-background-hover bg-foreground p-5 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white">
						Login
						<ArrowUpRight size={18} />
					</Link>
				</div>
			</section>
			<section className="col-span-2 h-full w-full border border-background-hover border-r-transparent"></section>
			<section className="col-span-2 h-full w-full border border-background-hover border-r-transparent"></section>
			<section className="relative col-span-2 h-full w-full border border-background-hover">
				<Link
					href="https://github.com/oscarprdev/cv-builder"
					className="absolute right-2 top-2 grid w-fit place-items-center rounded-full bg-white p-1">
					<Github stroke="black" fill="black" size={18} />
				</Link>
			</section>
		</main>
	);
}

export default page;
