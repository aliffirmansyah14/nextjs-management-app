import { Card, CardContent } from "@/components/ui/card";
import { getWorkspaceStats } from "../queries/get-workspace-stats";
import { CheckCircle2, Clock, FolderCheck, FolderOpen } from "lucide-react";
import Icon from "@/components/shared/icon";
import { delay } from "@/lib/utils";

type WorkspaceStatsProps = {
	promiseWorkspaceStats: ReturnType<typeof getWorkspaceStats>;
};

type WorkspaceStatsData = Awaited<WorkspaceStatsProps["promiseWorkspaceStats"]>;
type StatKey = keyof WorkspaceStatsData;

type StatConfig = {
	icon: React.ReactNode;
	label: React.ReactNode;
};

const workspaceStatsRender: Record<StatKey, StatConfig> = {
	projects: {
		icon: (
			<Icon
				icon={FolderOpen}
				bgColor="bg-primary/10 dark:bg-primary/20"
				iconStyle="text-primary max-sm:size-4"
				className="p-2 md:p-3 rounded-lg md:rounded-xl"
			/>
		),
		label: (
			<>
				<span className="hidden md:inline">Total </span>
				<span>Projects</span>
			</>
		),
	},
	tasks: {
		icon: (
			<Icon
				icon={FolderCheck}
				bgColor="bg-indigo-500/10 dark:bg-indigo-500/20"
				iconStyle="text-indigo-600 dark:text-indigo-400 max-sm:size-4"
				className="p-2 md:p-3 rounded-lg md:rounded-xl"
			/>
		),
		label: <span>Tasks</span>,
	},
	taskCompleted: {
		icon: (
			<Icon
				icon={CheckCircle2}
				bgColor="bg-emerald-500/10 dark:bg-emerald-500/20"
				iconStyle="text-emerald-600 dark:text-emerald-400 max-sm:size-4"
				className="p-2 md:p-3 rounded-lg md:rounded-xl"
			/>
		),
		label: <span>Completed</span>,
	},
	taskInProgress: {
		icon: (
			<Icon
				icon={Clock}
				bgColor="bg-amber-500/10 dark:bg-amber-500/20"
				iconStyle="text-amber-600 dark:text-amber-400 max-sm:size-4"
				className="p-2 md:p-3 rounded-lg md:rounded-xl"
			/>
		),
		label: <span>In Progress</span>,
	},
};

export default async function WorkspaceStats({
	promiseWorkspaceStats,
}: WorkspaceStatsProps) {
	await delay(1500);

	const workspaceStats = await promiseWorkspaceStats;
	// 	biar jadi [
	// 	[ task,0	],[projects,0]
	// ]
	const entries = Object.entries(workspaceStats) as [StatKey, number][];

	return (
		<div className="grid grid-cols-4 md:gap-3">
			{entries.map(([key, value], i) => {
				const config = workspaceStatsRender[key];

				// Skip render jika key tidak ada di konfigurasi
				if (!config) return null;

				const isLastItem = i === entries.length - 1;

				return (
					<Card key={key} className="rounded-none ring-0 md:rounded-xl md:py-5">
						<CardContent className="flex items-center flex-col sm:flex-row gap-2 md:gap-4 relative">
							{config.icon}

							<div className="space-y-0.5 text-center sm:text-start">
								<div className="text-lg md:text-2xl font-bold tracking-tight">
									{value}
								</div>
								<div className="text-muted-foreground text-[10px] truncate md:text-sm font-medium tracking-tight">
									{config.label}
								</div>
							</div>

							{/* Separator vertical untuk tampilan mobile */}
							{!isLastItem && (
								<div className="block md:hidden absolute top-0 right-0 w-px h-full border-r border-border" />
							)}
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
