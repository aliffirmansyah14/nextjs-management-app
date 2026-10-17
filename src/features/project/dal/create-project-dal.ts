"use server";

import { requireSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { ProjectFormType } from "../schemas/project-schema";
import { getWorkspaceById } from "@/features/workspace/queries/get-workspace-by-id";
import { AppError } from "@/lib/app-error";

export async function createProjectDAL(
	workspaceId: string,
	{ name, description }: ProjectFormType,
) {
	const { user } = await requireSession();

	const workspace = await getWorkspaceById(workspaceId, user.id);

	if (!workspace) {
		throw new AppError(
			"Workspace tidak ditemukan atau Anda tidak memiliki akses.",
		);
	}

	return prisma.project.create({
		data: {
			name,
			description,
			workspaceId,
		},
	});
}
