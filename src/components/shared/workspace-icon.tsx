import { cn } from "cn";

type WorkpsaceIconProps = {
	styleIcon: string;
	text: string;
} & React.ComponentPropsWithoutRef<"div">;

export default function WorkspaceIcon({
	styleIcon,
	className,
	children,
	text,
	...props
}: WorkpsaceIconProps) {
	return (
		<div className={cn("flex gap-4", className)} {...props}>
			<div
				className={cn(
					"size-6 text-xs shadow aspect-square flex justify-center items-center rounded-md text-white",
					styleIcon,
				)}
			>
				{text[0].toLocaleUpperCase()}
			</div>
			{children}
		</div>
	);
}
