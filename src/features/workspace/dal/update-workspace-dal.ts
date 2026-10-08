"use server";

import { AppError } from "@/lib/app-error";
import { requireSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { getWorkspaceById } from "../queries/get-workspace-by-id";

export async function updateWorkspaceDAL(id: string, name: string) {
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
		},
		where: {
			id,
			ownerId: user.id,
		},
	});
}
