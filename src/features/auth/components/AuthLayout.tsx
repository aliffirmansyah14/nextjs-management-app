import { cn } from "cn";

type AuthLayoutProps = React.ComponentPropsWithoutRef<"div">;

export default function AuthLayout({
	className,
	children,
	...props
}: AuthLayoutProps) {
	return (
		<div
			className={cn(
				"min-h-dvh flex justify-center items-center bg-muted",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
