import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto',
  {
    variants: {
      variant: {
        default: cn(
          'border bg-white text-gray-900',
          'dark:border-gray-800 dark:bg-black dark:text-gray-100',
        ),

        success: cn(
          'border border-[hsl(145,92%,87%)] bg-[hsl(143,85%,96%)] text-[hsl(140,100%,27%)]',
          'dark:border-[hsl(147,100%,12%)] dark:bg-[hsl(150,100%,6%)] dark:text-[hsl(150,86%,65%)]',
        ),

        info: cn(
          'border border-[hsl(221,91%,93%)] bg-[hsl(208,100%,97%)] text-[hsl(210,92%,45%)]',
          'dark:border-[hsl(223,43%,17%)] dark:bg-[hsl(215,100%,6%)] dark:text-[hsl(216,87%,65%)]',
        ),

        warning: cn(
          'border border-[hsl(49,91%,84%)] bg-[hsl(49,100%,97%)] text-[hsl(31,92%,45%)]',
          'dark:border-[hsl(60,100%,9%)] dark:bg-[hsl(64,100%,6%)] dark:text-[hsl(46,87%,65%)]',
        ),

        error: cn(
          'border border-[hsl(359,100%,94%)] bg-[hsl(359,100%,97%)] text-[hsl(360,100%,45%)]',
          'dark:border-[hsl(357,89%,16%)] dark:bg-[hsl(358,76%,10%)] dark:text-[hsl(358,100%,81%)]',
        ),

        secondary: cn(
          'bg-secondary text-secondary-foreground border-transparent',
          '[a&]:hover:bg-secondary/90',
        ),

        destructive: cn(
          'bg-destructive border-transparent text-white',
          '[a&]:hover:bg-destructive/90',
          'focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        ),

        outline: cn(
          'text-foreground',
          '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        ),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
