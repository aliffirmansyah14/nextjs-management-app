import { cn } from "cn";

type AuthLayoutProps = React.ComponentPropsWithoutRef<"div">;

export default function AuthLayout({
	className,
	children,
	...props
}: AuthLayoutProps) {
	return (
		<main
			className={cn(
				"min-h-dvh",
				"py-0 md:py-12",
				"bg-background md:bg-muted",
				className,
			)}
			{...props}
		>
			{children}
		</main>
	);
}
