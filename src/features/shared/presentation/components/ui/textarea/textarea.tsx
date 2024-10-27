import * as React from 'react';
import { cn } from '~/lib/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, name, label, errorMessage, ...props }, ref) => {
		return (
			<label
				htmlFor={name}
				className="relative flex w-full flex-col gap-2 text-sm font-semibold">
				{label}
				<textarea
					name={name}
					className={cn(
						'flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
					ref={ref}
					{...props}
				/>
				{errorMessage && <p className="absolute -bottom-5 text-xs">{errorMessage}</p>}
			</label>
		);
	}
);
Textarea.displayName = 'Textarea';

export { Textarea };
