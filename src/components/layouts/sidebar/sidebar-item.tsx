import { cn } from "@/lib/utils";
import Link from "next/link";

type SidebarItemProps<T extends React.ElementType> = {
	icon?: React.ReactNode;
	isActive?: boolean;
	as?: T;
	ariaCurrent?: string;
} & React.ComponentProps<T>;

export default function SidebarItem<T extends React.ElementType = "div">({
	className,
	ariaCurrent,
	children,
	icon,
	isActive = false,
	as,
	...props
}: SidebarItemProps<T>) {
	// const Icon = icon;
	const Comp = as ?? "div";

	return (
		<Comp
			aria-current={isActive && as && as === Link ? "page" : undefined}
			className={cn(
				"flex items-center gap-4",
				"px-2.5 py-1.5",
				"rounded-lg",
				"font-medium tracking-tight ",
				className,
				{
					"text-muted-foreground hover:bg-muted": !isActive,
					"text-primary bg-primary/10": isActive,
				},
			)}
			{...props}
		>
			{icon}
			{children}
		</Comp>
	);
}
