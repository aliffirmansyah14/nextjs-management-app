import { cn } from "@/lib/utils";
import { Icon as IconType } from "@/types/icon";

type IconProps = {
	icon: IconType;
	color: string;
	bgColor: string;
	size?: "lg" | "sm" | "default";
} & React.ComponentPropsWithoutRef<"div">;

export default function Icon({
	className,
	icon,
	color,
	bgColor,
	size = "default",
	...props
}: IconProps) {
	const Icon = icon;
	const sizeIcon: Record<typeof size, string> = {
		default: "size-6",
		sm: "size-4",
		lg: "size-7",
	};

	return (
		<div
			className={cn(
				"flex rounded-full p-2 justify-center items-center",
				bgColor,
				className,
			)}
			{...props}
		>
			<Icon className={`${sizeIcon[size]} ${color}`} />
		</div>
	);
}
