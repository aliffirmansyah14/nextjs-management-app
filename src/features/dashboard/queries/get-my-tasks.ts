import { prisma } from "@/lib/prisma";
import { TaskStatusParams } from "../types/status-params";

export const getMyTasks = async ({
	userId,
	status,
}: {
	userId: string;
	status: TaskStatusParams;
}) => {
	return prisma.task.findMany({
		select: {
			id: true,
			name: true,
			status: true,
			dueDate: true,
			project: {
				select: {
					name: true,
				},
			},
		},
		where: {
			project: {
				workspace: {
					ownerId: userId,
				},
			},
			...(status !== "ALL" && {
				status,
			}),
		},
		take: 5,
	});
};
