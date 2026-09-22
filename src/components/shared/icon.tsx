import { cn } from "@/lib/utils";
import { Icon as IconType } from "@/types/icon";

type IconProps = {
	icon: IconType;
	render: (Iconprops: IconType) => React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

export default function Icon({ className, icon, render, ...props }: IconProps) {
	return (
		<div
			className={cn(
				"flex rounded-full p-2 justify-center items-center",
				className,
			)}
			{...props}
		>
			{render(icon)}
		</div>
	);
}
