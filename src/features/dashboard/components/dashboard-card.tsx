import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type DashsboadCardProps = {
	title: string;
	actionUrl: string;
	className?: string;
	children?: React.ReactNode;
};

export default function DashboardCard({
	title,
	actionUrl,
	className,
	children,
}: DashsboadCardProps) {
	return (
		<Card className={cn("gap-4", className)}>
			<CardHeader className="border-border border-b [.border-b]:pb-2">
				<CardTitle className=" font-semibold tracking-tight">{title}</CardTitle>
				{actionUrl && (
					<CardAction className="self-center">
						<Link
							href={actionUrl}
							className="flex items-center gap-1 text-[10px]  tracking-normal text-muted-foreground hover:text-card-foreground"
						>
							View all
							<ArrowRight className="size-3" />
						</Link>
					</CardAction>
				)}
			</CardHeader>
			<CardContent className="px-8 relative grid gap-4">{children}</CardContent>
		</Card>
	);
}

export function DashboardCardContent({
	className,
	children,
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div className={cn("w-full flex items-center gap-4", className)}>
			{children}
		</div>
	);
}
