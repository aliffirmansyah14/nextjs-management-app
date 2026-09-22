import { prisma } from "@/lib/prisma";

export const getAllWorkspaces = async (userId: string) => {
	return prisma.workspace.findMany({
		where: {
			ownerId: userId,
		},
		select: {
			id: true,
			name: true,
			projects: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};
