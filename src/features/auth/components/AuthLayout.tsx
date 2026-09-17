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
				"min-h-dvh  my-0 md:my-12 bg-background md:bg-muted",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
