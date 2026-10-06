import { prisma } from "@/lib/prisma";

export const getUpcomingTask = async (userId: string) => {
	return prisma.task.findMany({
		where: {
			project: {
				workspace: {
					ownerId: userId,
				},
			},
			dueDate: {
				gte: new Date(),
			},
		},
		select: {
			id: true,
			name: true,
			dueDate: true,
		},
		orderBy: {
			dueDate: "asc",
		},
		take: 4,
	});
};
