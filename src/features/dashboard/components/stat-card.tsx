import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Equal } from "lucide-react";
import { Stat } from "./stat-list";
import { Icon as IconType } from "@/types/icon";
import Icon from "@/components/shared/icon";

type StatCardProps = Stat;

const styleIconColor = {
	purple: {
		bg: "bg-purple-500/10",
		icon: "text-purple-500",
	},
	orange: {
		bg: "bg-orange-500/10",
		icon: "text-orange-500",
	},
	primary: {
		bg: "bg-primary/10",
		icon: "text-primary",
	},
	green: {
		bg: "bg-green-500/10",
		icon: "text-green-500",
	},
} as const;

export default function StatCard({
	title,
	icon,
	increase,
	stat,
	color,
	description,
}: StatCardProps) {
	const trend = increase > 0 ? "up" : "neutral";

	// ikoon
	const iconTrend: Record<typeof trend, IconType> = {
		up: ArrowUp,
		neutral: Equal,
	};
	const SummaryIcon = iconTrend[trend];

	//  warna kondisi
	const statusColorClass: Record<typeof trend, string> = {
		up: "text-green-500",
		neutral: "text-muted-foreground",
	};

	const formattedIncrease = !description
		? trend === "up"
			? `+${increase}`
			: increase
		: `${increase}%`;

	return (
		<Card>
			<CardContent className="flex flex-col gap-2 tracking-tight p-4">
				<div className="w-fit">
					<Icon
						bgColor={styleIconColor[color].bg}
						icon={icon}
						color={styleIconColor[color].icon}
					/>
				</div>
				<div className="text-sm font-medium text-muted-foreground">{title}</div>

				<div className="text-2xl font-bold text-foreground">{stat}</div>

				<div className="flex items-center gap-1.5 text-xs">
					<SummaryIcon className={`size-4 ${statusColorClass[trend]}`} />

					<span className={`font-semibold ${statusColorClass[trend]}`}>
						{formattedIncrease}
					</span>

					<span className="text-muted-foreground/80">
						{description ?? "daari minggu ini"}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
