import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const logoVariants = cva(
	"group/logo inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding  whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50  disabled:pointer-events-none [&_div>svg]:shrink-0 [&_div>svg:not([class*='size-'])]:size-7 font-semibold [&_div>svg:not([class*='text-'])]:text-white [&_span]:tracking-tight [&_span]:font-bold [&_span]:text-xl [&_span:not([class*='text-'])]:text-primary [&_div]:rounded-lg",
	{
		variants: {
			size: {
				default: "h-9 gap-3 px-2.5 gap-4",
				sm: "h-8 gap-2 px-2.5 text-[0.8rem] [&_div]:rounded-lg [&_div>svg:not([class*='size-'])]:size-4 [&_span]:text-base",
				lg: "h-10 gap-3 px-2.5 [&_div>svg:not([class*='size-'])]:size-10 [&_span]:text-3xl [&_div]:rounded-xl",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

type LogoProps<T extends React.ElementType = "div"> = {
	as?: T;
	styleText?: string;
} & React.ComponentProps<T> &
	VariantProps<typeof logoVariants>;

export default function Logo({
	className,
	as,
	styleText,
	size = "default",
	...props
}: LogoProps) {
	const Comp = as ?? "div";

	return (
		<Comp className={cn(logoVariants({ size, className }))} {...props}>
			<div className="flex justfy-center items-center bg-primary p-1">
				<Check className="text-white" />
			</div>
			<span className={styleText}>Taskly</span>
		</Comp>
	);
}
