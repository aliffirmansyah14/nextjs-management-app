import { prisma } from "@/lib/prisma";

export const getRecentProjects = async (userId: string) => {
	return prisma.project.findMany({
		where: {
			workspace: {
				ownerId: userId,
			},
		},
		select: {
			id: true,
			name: true,
			workspace: {
				select: {
					name: true,
				},
			},
			tasks: {
				select: {
					name: true,
					status: true,
				},
			},
			_count: true,
		},
		orderBy: {
			createdAt: "desc",
		},
		take: 3,
	});
};
