"use server";

import { AppError } from "@/lib/app-error";
import { requireSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { getWorkspaceById } from "../queries/get-workspace-by-id";
import { WorkspaceFormType } from "../schemas/workspace-schema";

export async function updateWorkspaceDAL(
	id: string,
	{ name, description }: WorkspaceFormType,
) {
	const { user } = await requireSession();

	const workspace = await getWorkspaceById(id, user.id);

	if (!workspace) {
		throw new AppError(
			"Workspace tidak ditemukan atau Anda tidak memiliki akses.",
		);
	}

	return prisma.workspace.update({
		data: {
			name,
			description,
		},
		where: {
			id,
			ownerId: user.id,
		},
	});
}
