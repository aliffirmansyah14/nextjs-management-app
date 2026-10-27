import { prisma } from "@/lib/prisma";

export const getWorkspaceById = async (id: string, userId: string) => {
	return await prisma.workspace.findFirst({
		select: {
			id: true,
			name: true,
			description: true,
			createdAt: true,
			_count: {
				select: {
					projects: true,
				},
			},
		},
		where: { id, ownerId: userId },
	});
};
