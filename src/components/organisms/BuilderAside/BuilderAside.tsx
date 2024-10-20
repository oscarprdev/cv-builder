import React from 'react';

const BuilderAside = () => {
	return (
		<aside
			data-testid="builder-aside"
			className="flex w-full bg-backgroundLight pt-2 md:w-1/3 md:min-w-[450px] md:p-5">
			<label></label>
			<div
				aria-label="scroll-horizontal"
				className="flex h-[80px] w-full items-center gap-1 overflow-y-scroll px-5 pb-2 pt-12 sm:justify-center md:h-full md:flex-col md:items-start md:px-0 md:pb-0">
				<footer className="flex w-fit md:ml-0 md:mt-auto md:w-full md:flex-col md:border-t-4 md:pt-5"></footer>
			</div>
		</aside>
	);
};

export default BuilderAside;
