import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all duration-300 ease-in-out outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md",
        outline:
          "border-gray-300 bg-white text-gray-700 hover:border-red-600 hover:text-red-600 active:bg-red-50",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "text-gray-700 hover:bg-gray-100 hover:text-red-600",
        destructive: "bg-red-50 text-red-600 hover:bg-red-100",
        link: "text-red-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-2 rounded-xl px-5",
        xs: "h-8 gap-1 rounded-lg px-3 text-xs",
        sm: "h-9 gap-1.5 rounded-lg px-4",
        lg: "h-11 gap-2 rounded-xl px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
