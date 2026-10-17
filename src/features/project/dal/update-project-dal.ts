"use server";

import { requireSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { ProjectFormType } from "../schemas/project-schema";
import { getWorkspaceById } from "@/features/workspace/queries/get-workspace-by-id";
import { AppError } from "@/lib/app-error";
import { getProjectById } from "../queries/get-project-by-id";

export async function updateProjectDAL(
	params: { projectId: string; workspaceId: string } & ProjectFormType,
) {
	const { workspaceId, projectId, ...data } = params;

	const { user } = await requireSession();

	const workspace = await getWorkspaceById(workspaceId, user.id);

	if (!workspace) {
		throw new AppError(
			"Workspace tidak ditemukan atau Anda tidak memiliki akses.",
		);
	}

	const result = await prisma.project.updateMany({
		data: {
			name: data.name,
			description: data.description,
		},
		where: {
			id: projectId,
			workspaceId,
		},
	});

	if (result.count === 0) {
		throw new AppError("Project tidak ditemukan");
	}

	return result;
}
