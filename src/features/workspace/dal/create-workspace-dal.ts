"use server";

import { requireSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { WorkspaceFormType } from "../schemas/workspace-schema";

export async function createWorkspaceDAL({
	name,
	description,
}: WorkspaceFormType) {
	const { user } = await requireSession();

	return prisma.workspace.create({
		data: {
			name,
			description,
			ownerId: user.id,
		},
	});
}
