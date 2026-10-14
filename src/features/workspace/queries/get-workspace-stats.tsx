import { prisma } from "@/lib/prisma";

export const getWorkspaceStats = async (
	workspaceId: string,
	userId: string,
) => {
	const [projects, tasksGroupByStatus] = await Promise.all([
		// Count Projects milik user
		prisma.project.count({
			where: {
				workspace: { ownerId: userId, id: workspaceId },
			},
		}),

		// Count Tasks milik user
		prisma.task.groupBy({
			by: ["status"],
			_count: {
				_all: true,
			},
			where: {
				project: { workspace: { ownerId: userId, id: workspaceId } },
			},
		}),
	]);
	let taskCounter = {
		total: 0,
		IN_PROGRESS: 0,
		DONE: 0,
	};
	tasksGroupByStatus.forEach(task => {
		if (task.status !== "TODO") {
			taskCounter[task.status] = task._count._all;
		}
		taskCounter.total += task._count._all;
	});

	return {
		projects,
		tasks: taskCounter.total,
		taskCompleted: taskCounter.DONE,
		taskInProgress: taskCounter.IN_PROGRESS,
	};
};
