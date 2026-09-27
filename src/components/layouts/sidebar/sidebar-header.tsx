import Logo, { LogoProps } from "@/components/shared/logo";

export default function SidebarHeader({
	className,
	children,
	size = "default",
	...props
}: Pick<LogoProps, "size"> & React.ComponentPropsWithoutRef<"div">) {
	return (
		<div className={className} {...props}>
			<Logo
				size={size}
				className="flex-1 justify-start gap-3 shrink-0"
				styleText="text-black/90"
			/>
			{children}
		</div>
	);
}
