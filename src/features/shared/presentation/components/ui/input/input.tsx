import * as React from 'react';
import { cn } from '~/lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, errorMessage, label, name, ...props }, ref) => {
		return (
			<label htmlFor={name} className="relative flex w-full flex-col gap-2 text-sm">
				{label}
				<input
					type={type}
					name={name}
					className={cn(
						'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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
Input.displayName = 'Input';

export { Input };
