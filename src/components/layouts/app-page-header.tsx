import { cn } from "@/lib/utils";

type AppPageTitleProps = React.ComponentPropsWithoutRef<"h1">;

export function AppPageTitle({
	className,
	children,
	...props
}: AppPageTitleProps) {
	return (
		<h1
			className={cn(
				"font-semibold text-xl md:text-3xl tracking-tight text-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</h1>
	);
}

// 2. AppPageHeader (Wrapper Utama)
type AppPageHeaderProps = React.ComponentPropsWithoutRef<"div"> & {
	title: string;
	description?: string;
	actions?: React.ReactNode;
};

export function AppPageHeader({
	title,
	description,
	actions,
	className,
	...props
}: AppPageHeaderProps) {
	return (
		<div
			className={cn(
				"flex gap-1 items-center md:items-start justify-between pb-6",
				className,
			)}
			{...props}
		>
			<div className="md:space-y-2">
				<AppPageTitle>{title}</AppPageTitle>
				{description && (
					<p className="hidden md:block text-sm text-muted-foreground">
						{description}
					</p>
				)}
			</div>

			{actions && <div className="flex items-center">{actions}</div>}
		</div>
	);
}
