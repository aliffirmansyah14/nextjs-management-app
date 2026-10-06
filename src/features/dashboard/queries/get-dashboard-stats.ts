import { prisma } from "@/lib/prisma";

export const getDashboardStats = async (userId: string) => {
	const now = new Date();
	const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

	// Ambil statistik saat ini dan statistik minggu lalu secara paralel
	const [currentStats, lastWeekStats] = await Promise.all([
		getCounts(userId),
		getCounts(userId, lastWeek),
	]);

	return {
		workspaces: {
			weeklyAdded: lastWeekStats.workspaces,
			total: currentStats.workspaces,
		},
		projects: {
			weeklyAdded: lastWeekStats.projects,
			total: currentStats.projects,
		},
		task: {
			weeklyAdded: lastWeekStats.tasks,
			total: currentStats.tasks,
		},
		completeTask: {
			total: currentStats.completedTasks ?? 0,
		},
	};
};

const getCounts = async (userId: string, beforeDate?: Date) => {
	const dateFilter = beforeDate ? { gte: beforeDate } : undefined;

	const [workspaces, projects, tasksGroupByStatus] = await Promise.all([
		// Count Workspaces
		prisma.workspace.count({
			where: {
				ownerId: userId,
				...(dateFilter && { createdAt: dateFilter }),
			},
		}),

		// Count Projects milik user
		prisma.project.count({
			where: {
				workspace: { ownerId: userId },
				...(dateFilter && { createdAt: dateFilter }),
			},
		}),

		// Count Tasks milik user
		prisma.task.groupBy({
			by: ["status"],
			_count: {
				_all: true,
			},
			where: {
				project: { workspace: { ownerId: userId } },
				...(dateFilter && { createdAt: dateFilter }),
			},
		}),
	]);
	const tasks = tasksGroupByStatus.reduce(
		(acc, curr) => acc + curr._count._all,
		0,
	);

	const completedTasks = !dateFilter
		? (tasksGroupByStatus.find(item => item.status === "DONE")?._count._all ??
			0)
		: undefined;

	return { workspaces, projects, tasks, completedTasks };
};

// export const getDashboardData = async (userId: string) => {
// 	const now = new Date();

// 	// 1. Tentukan batas waktu (Rentang 7 hari)
// 	const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
// 	const [currentWorkpaces, lastWeekWorkspaces] = await Promise.all([
// 		getCountStats(userId),
// 		getCountStats(userId, {
// 			createdAt: {
// 				lte: lastWeek,
// 			},
// 		}),
// 	]);

// 	const [currentDTO, lastWeekDTO] = [
// 		dtoDataDashboard(currentWorkpaces),
// 		dtoDataDashboard(lastWeekWorkspaces),
// 	];

// 	return {
// 		increaseTask: currentDTO.countTask - lastWeekDTO?.countTask,
// 		increaseWorkspaces:
// 			currentDTO.countWorkspaces - lastWeekDTO.countWorkspaces,
// 		increaseProjects: currentDTO.countProjects - lastWeekDTO.countProjects,
// 	};
// };

// export const getCountStats = async (
// 	userId: string,
// 	where?: Prisma.WorkspaceWhereInput,
// ) => {
// 	return prisma.workspace.findMany({
// 		select: {
// 			id: true,
// 			_count: true,
// 			projects: {
// 				select: {
// 					_count: true,
// 				},
// 			},
// 		},
// 		where: {
// 			ownerId: userId,
// 			...where,
// 		},
// 	});
// };

// type DTOStat = {
// 	countWorkspaces: number;
// 	countProjects: number;
// 	countTask: number;
// };

// const dtoDataDashboard = (data: Awaited<ReturnType<typeof getCountStats>>) => {
// 	return data.reduce(
// 		(acc, current) => ({
// 			countWorkspaces: (acc.countWorkspaces ?? 0) + 1,
// 			countProjects: (acc.countProjects ?? 0) + current._count.projects,
// 			countTask: (acc.countTask ?? 0) + current.projects[0]._count.tasks,
// 		}),
// 		{
// 			countProjects: 0,
// 			countTask: 0,
// 			countWorkspaces: 0,
// 		} as DTOStat,
// 	);
// };
