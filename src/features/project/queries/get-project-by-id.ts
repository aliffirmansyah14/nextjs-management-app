import { prisma } from "@/lib/prisma";

export async function getProjectById(id: string, workspaceId: string) {
	return prisma.project.findUnique({
		where: {
			id,
			workspaceId,
		},
	});
}
