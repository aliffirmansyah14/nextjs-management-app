import { prisma } from "@/lib/prisma";

export const getUserWorkspaces = async (userId: string) => {
	return prisma.workspace.findMany({
		where: {
			ownerId: userId,
		},
		select: {
			id: true,
			name: true,
			description: true,
			_count: {
				select: {
					projects: true,
				},
			},
		},
	});
};
