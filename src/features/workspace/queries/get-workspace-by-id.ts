import { prisma } from "@/lib/prisma";

export const getWorkspaceById = async (id: string, userId: string) => {
	return await prisma.workspace.findFirst({
		select: {
			id: true,
			name: true,
			description: true,
			createdAt: true,
			projects: {
				select: {
					id: true,
					name: true,
				},
			},
		},
		where: { id, ownerId: userId },
	});
};
