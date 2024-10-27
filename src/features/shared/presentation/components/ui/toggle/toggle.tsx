'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '~/lib/utils/cn';

const toggleVariants = cva(
	'inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
	{
		variants: {
			variant: {
				default: 'bg-background-light hover:bg-background-hover',
				outline:
					'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
			},
			size: {
				default: 'p-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

const Toggle = React.forwardRef<
	React.ElementRef<typeof TogglePrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
		VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
	<TogglePrimitive.Root
		ref={ref}
		className={cn(toggleVariants({ variant, size, className }))}
		{...props}
	/>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
