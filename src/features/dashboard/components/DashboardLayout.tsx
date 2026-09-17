import { cn } from "@/lib/utils";
import DashboaradHeader from "./DashboaradHeader";

type DasahboardLayout = React.ComponentPropsWithoutRef<"div">;

export default function DasahboardLayout({
	className,
	children,
	...props
}: DasahboardLayout) {
	return (
		<div className={cn("min-h-dvh", className)} {...props}>
			<DashboaradHeader />
			{children}
		</div>
	);
}
