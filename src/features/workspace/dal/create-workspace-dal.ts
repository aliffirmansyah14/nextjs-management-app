"use server";

import { requireSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function createWorkspaceDAL(name: string) {
	const { user } = await requireSession();

	return prisma.workspace.create({
		data: {
			name,
			ownerId: user.id,
		},
	});
}
