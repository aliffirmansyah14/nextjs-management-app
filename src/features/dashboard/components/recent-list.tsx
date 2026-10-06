import { User } from "@/types/user";
import { getRecentWorkspaces } from "@/features/workspace/queries/get-recents-workspaces";
import WorkspaceIcon from "@/components/shared/workspace-icon";
import { Calendar, ChevronRight, LayoutArrowDown, Package } from "lucide-react";
import { getRecentProjects } from "@/features/project/queries/get-recent-projects";
import Icon from "@/components/shared/icon";
import { cn } from "cn";
import DashboardCard, { DashboardCardContent } from "./dashboard-card";
import { getUpcomingTask } from "@/features/task/queries/get-upcoming-task";
import EmptyState from "@/components/shared/empty-state";

const styleColor = [
	{
		base: "bg-purple-600",
		bg: "bg-purple-600/20",
		icon: "text-purple-600",
		dot: "border-purple-600 bg-purple-600/50",
	},
	{
		base: "bg-green-500",
		bg: "bg-green-500/20",
		icon: "text-green-500",
		dot: "border-green-500 bg-green-500/50",
	},
	{
		base: "bg-primary",
		bg: "bg-primary/20",
		icon: "text-primary",
		dot: "border-primary bg-primary/50",
	},
];

export default async function RecentList({
	user,
	className,
}: {
	user: User;
	className?: string;
}) {
	const [recentWorkspaces, recentProjects, upcomingTask] = await Promise.all([
		getRecentWorkspaces(user.id),
		getRecentProjects(user.id),
		getUpcomingTask(user.id),
	]);

	return (
		<div className={cn("grid md:grid-cols-3 gap-4", className)}>
			{/* workpsace recent card */}
			<DashboardCard title="Recent Workspaces" actionUrl="/workspaces">
				{recentWorkspaces.length === 0 ? (
					<EmptyState
						icon={<LayoutArrowDown className="size-5 text-muted-foreground" />}
						title="Belum ada workspace"
						description="Buat workspace pertama untuk mulai mengelola project."
					/>
				) : (
					recentWorkspaces.map((workpsace, i) => (
						<DashboardCardContent
							key={workpsace.id}
							className="justify-between"
						>
							<div className="flex gap-4 items-center">
								<WorkspaceIcon
									styleIcon={`${styleColor[i % styleColor.length].base} rounded-full size-10 text-base`}
									text={workpsace.name[0]}
								/>
								<div className="space-y-1">
									<div className="font-semibold text-slate-600">
										{workpsace.name}
									</div>
									<div className="text-muted-foreground text-xs">
										{workpsace._count.projects} projects
									</div>
								</div>
							</div>
							{/* icon arroow */}
							<ChevronRight className="size-4 text-muted-foreground" />
						</DashboardCardContent>
					))
				)}
			</DashboardCard>

			{/* project recent card */}
			<DashboardCard title="Recent Projects" actionUrl="/projects">
				{recentProjects.length === 0 ? (
					<EmptyState
						title="Belum ada project"
						description="Tambahkan project ke dalam workspace untuk mulai bekerja."
					/>
				) : (
					recentProjects.map((project, i) => {
						const taskComplete = project.tasks.reduce(
							(acc, current) => (current.status === "DONE" ? acc + 1 : acc),
							0,
						);
						const progress =
							project._count.tasks > 0
								? Math.floor((taskComplete / project._count.tasks) * 100)
								: 0;
						const color = styleColor[i % styleColor.length];

						return (
							<DashboardCardContent key={project.id}>
								<Icon icon={Package} bgColor={color.bg} color={color.icon} />
								<div className="flex-1 space-y-1">
									<div className="grid gap-1">
										<div className="font-semibold text-slate-600">
											{project.name}
										</div>
										<div className="flex items-center gap-1">
											{/* dot */}
											<div
												className={`border size-2 rounded-full ${color.dot}`}
											/>
											<span className="text-muted-foreground text-xscapitalize">
												{project.workspace.name}
											</span>
										</div>
									</div>

									{/* progresss bar */}
									<div className="flex items-center gap-4">
										{/* bar */}
										<div className="h-1 flex-1 relative bg-muted rounded-full overflow-hidden">
											{/* complete bbar */}
											<div
												className={`absolute left-o top-0 h-full ${color.base}`}
												style={{
													width: `${progress}%`,
												}}
											/>
										</div>
										{/* progress */}
										<div className="text-muted-foreground text-xs">
											{progress}%
										</div>
									</div>
								</div>
							</DashboardCardContent>
						);
					})
				)}
			</DashboardCard>

			{/* upcoming task */}
			<DashboardCard title="Upcoming Task" actionUrl="/tasks">
				{upcomingTask.length === 0 ? (
					<EmptyState
						title="Tidak ada task"
						description="Semua task selesai atau belum ada deadline yang dibuat."
					/>
				) : (
					upcomingTask.map(task => (
						<DashboardCardContent key={task.id}>
							<div className="size-6 rounded-full	 border border-muted-foreground " />
							<div className="flex-1 space-y-1">
								<div className="font-semibold text-slate-600 capitalize">
									{task.name}
								</div>
								<div className="flex gap-1 text-muted-foreground text-xs">
									<Calendar className="size-3 text-muted-foreground" />
									<span>
										{new Intl.DateTimeFormat("id-ID", {
											month: "short",
											day: "numeric",
										}).format(new Date())}
									</span>
								</div>
							</div>
						</DashboardCardContent>
					))
				)}
			</DashboardCard>
		</div>
	);
}
