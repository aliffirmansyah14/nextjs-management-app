import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
	icon?: React.ReactNode;
	title: string;
	description: string;
	action?: React.ReactNode;
	className?: string;
	iconClassName?: string;
};

export default function EmptyState({
	icon,
	title,
	description,
	action,
	className,
	iconClassName,
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center p-8 text-center animate-in fade-in-50 duration-300",
				className,
			)}
		>
			{/* Wadah Ikon dengan efek visual yang menarik */}
			<div
				className={cn(
					"flex size-12 items-center justify-center rounded-full bg-muted/60 border border-border/40 shadow-sm mb-3",
					iconClassName,
				)}
			>
				{icon ? icon : <Inbox className="size-8 text-muted-foreground" />}
			</div>

			{/* Judul */}
			<h3 className="text-base font-semibold tracking-tight text-foreground">
				{title}
			</h3>

			{/* Deskripsi */}
			<p className="mt-1.5 max-w-sm text-sm text-muted-foreground ">
				{description}
			</p>

			{/* Slot Action (Opsional: Tombol / Link) */}
			{action && <div className="mt-5">{action}</div>}
		</div>
	);
}
