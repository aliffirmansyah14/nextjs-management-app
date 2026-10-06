import { User } from "@/types/user";
import {
	CheckCheck,
	CheckSquare,
	CheckSquare2Icon,
	Folder,
} from "lucide-react";
import StatCard from "./stat-card";
import { getDashboardStats } from "../queries/get-dashboard-stats";
import { Icon as IconType } from "@/types/icon";

export type Stat = {
	title: string;
	icon: IconType;
	stat: number;
	increase: number;
	description?: string;
	color: "purple" | "green" | "orange" | "primary";
};

export default async function StatList({ user }: { user: User }) {
	const { completeTask, projects, task, workspaces } = await getDashboardStats(
		user.id,
	);

	// Menghindari Division by Zero (NaN)
	const completionPercentage =
		task.total > 0 ? Math.floor((completeTask.total / task.total) * 100) : 0;

	const stats: Stat[] = [
		{
			title: "Total Workspaces",
			icon: Folder,
			stat: workspaces.total,
			increase: workspaces.weeklyAdded,
			color: "purple",
		},
		{
			title: "Total Projects",
			icon: CheckSquare2Icon,
			stat: projects.total,
			increase: projects.weeklyAdded,
			color: "green",
		},
		{
			title: "Total Tasks",
			icon: CheckSquare,
			color: "orange",
			stat: task.total,
			increase: task.weeklyAdded,
		},
		{
			title: "Completed Tasks",
			icon: CheckCheck,
			color: "primary",
			stat: completeTask.total,
			increase: completionPercentage,
			description: "dari total taks",
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
					color={stat.color}
					description={stat.description}
				/>
			))}
		</div>
	);
}
