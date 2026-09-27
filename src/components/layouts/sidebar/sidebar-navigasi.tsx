import { cn } from "@/lib/utils";

type SidebarNavigasiProps<T> = {
	links: T[];
	render: (data: T, index: number) => React.ReactNode;
} & React.ComponentPropsWithoutRef<"ul">;

export default function SidebarNavigasi<T>({
	className,
	links,
	render,
	...props
}: SidebarNavigasiProps<T>) {
	return (
		<ul className={cn("grid gap-2")} {...props}>
			{links.map(render)}
		</ul>
	);
}
