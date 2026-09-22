import { User } from "@/types/user";
import Icon from "@/components/shared/icon";
import {
	CheckCheck,
	CheckSquare,
	CheckSquare2Icon,
	Folder,
} from "lucide-react";
import StatCard from "./stat-card";
import { getDashboardStats } from "../queries/get-dashboard-stats";

export type Stat = {
	title: string;
	icon: React.ReactNode;
	stat: number;
	increase: number;
	description?: string;
};

export default async function StatList({ user }: { user: User | null }) {
	if (!user) {
		return null;
	}

	const { completeTask, projects, task, workspaces } = await getDashboardStats(
		user.id,
	);

	// Menghindari Division by Zero (NaN)
	const completionPercentage =
		task.total > 0
			? Number(((completeTask.total / task.total) * 100).toFixed(1))
			: 0;

	const stats: Stat[] = [
		{
			title: "Total Workspaces",
			icon: (
				<Icon
					className="bg-purple-500/10"
					icon={Folder}
					render={Comp => <Comp className="text-purple-500 size-6" />}
				/>
			),
			stat: workspaces.total,
			increase: workspaces.increase,
		},
		{
			title: "Total Projects",
			icon: (
				<Icon
					className="bg-green-500/10"
					icon={CheckSquare2Icon}
					render={Comp => <Comp className="text-green-500 size-6" />}
				/>
			),
			stat: projects.total,
			increase: projects.increase,
		},
		{
			title: "Total Tasks",
			icon: (
				<Icon
					className="bg-primary/10"
					icon={CheckSquare}
					render={Comp => <Comp className="text-primary size-6" />}
				/>
			),
			stat: task.total,
			increase: task.increase,
		},
		{
			title: "Completed Tasks",
			icon: (
				<Icon
					className="bg-green-600/10"
					icon={CheckCheck}
					render={Comp => <Comp className="text-green-600 size-6" />}
				/>
			),
			stat: completeTask.total,
			increase: completionPercentage,
			description: "% of total tasks",
		},
	];

	return (
		<div className="max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{stats.map(stat => (
				<StatCard
					key={stat.title}
					icon={stat.icon}
					increase={stat.increase}
					title={stat.title}
					stat={stat.stat}
					description={stat.description}
				/>
			))}
		</div>
	);
}
