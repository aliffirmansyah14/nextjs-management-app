import { prisma } from "@/lib/prisma";

export const getRecentWorkspaces = async (userId: string) => {
	return prisma.workspace.findMany({
		where: {
			ownerId: userId,
		},
		select: {
			id: true,
			name: true,
			_count: true,
		},
		orderBy: {
			createdAt: "desc",
		},
		take: 3,
	});
};
