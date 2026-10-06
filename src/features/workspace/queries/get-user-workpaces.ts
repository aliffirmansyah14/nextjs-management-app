import { prisma } from "@/lib/prisma";

export const getUserWorkspaces = async (userId: string) => {
	return prisma.workspace.findMany({
		where: {
			ownerId: userId,
		},
		select: {
			id: true,
			name: true,
			projects: {
				select: {
					id: true,
					name: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};
