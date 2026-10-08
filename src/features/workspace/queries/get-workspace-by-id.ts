import { prisma } from "@/lib/prisma";

export const getWorkspaceById = async (id: string, userId: string) => {
	return await prisma.workspace.findFirst({
		where: { id, ownerId: userId },
	});
};
