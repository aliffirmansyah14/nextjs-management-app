import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Equal } from "lucide-react";
import { Stat } from "./stat-list";

type StatCardProps = Stat;

export default function StatCard({
	title,
	icon,
	increase,
	stat,
	description,
}: StatCardProps) {
	const isIncrease = increase > 0;

	// ikoon
	const SummaryIcon = isIncrease ? ArrowUp : Equal;

	//  warna kondisi
	const statusColorClass = isIncrease
		? "text-status-done"
		: "text-muted-foreground";

	const formattedIncrease = isIncrease ? `+${increase}` : `${increase}`;

	return (
		<Card>
			<CardContent className="flex flex-col gap-2 tracking-tight p-4">
				<div className="w-fit">{icon}</div>
				<div className="text-sm text-muted-foreground">{title}</div>
				<div className="text-2xl font-bold text-foreground">{stat}</div>
				<div className="flex items-center gap-1.5 text-xs">
					<SummaryIcon className={`size-4 ${statusColorClass}`} />
					<span className={`font-semibold ${statusColorClass}`}>
						{formattedIncrease}
					</span>
					<span className="text-muted-foreground/80">
						{description ?? "from last week"}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
