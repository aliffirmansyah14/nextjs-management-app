import { Inbox } from "lucide-react";

type EmptyStateProps = {
	icon?: React.ReactNode;
	title: string;
	description: string;
};

export default function EmptyState({
	icon,
	title,
	description,
}: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-2 text-center">
			<div className="rounded-full bg-muted p-3">
				{icon ? icon : <Inbox className="size-5 text-muted-foreground" />}
			</div>

			<h3 className="mt-4 font-medium tracking-tight">{title}</h3>

			<p className="mt-1 max-w-xs text-sm text-muted-foreground">
				{description}
			</p>
		</div>
	);
}
