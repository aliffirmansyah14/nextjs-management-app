import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const getProjectsTask = async (
	workspaceId: string,
	userId: string,
	args?: Pick<Prisma.ProjectFindManyArgs, "where" | "orderBy">,
) => {
	return prisma.project.findMany({
		where: {
			workspace: {
				ownerId: userId,
				id: workspaceId,
			},
			...args?.where,
		},
		select: {
			id: true,
			name: true,
			tasks: {
				select: {
					status: true,
					name: true,
				},
			},
			createdAt: true,
			updatedAt: true,
		},
		orderBy: {
			...(args?.orderBy ?? { createdAt: "desc" }),
		},
	});
};
