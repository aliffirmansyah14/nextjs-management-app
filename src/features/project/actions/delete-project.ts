"use server";

import { ActionResponse } from "@/types/action";
import { AppError } from "@/lib/app-error";
import { revalidatePath } from "next/cache";
import { deleteProjectDAL } from "@/features/project/dal/delete-project-dal";

export async function deleteProjectAction(
	id: string,
	workspaceId: string,
): Promise<ActionResponse> {
	try {
		await deleteProjectDAL(id, workspaceId);

		// Revalidate data list workspace projects
		revalidatePath(`/workspaces/$${workspaceId}`);

		return {
			success: true,
			message: "Project berhasil dihapus",
		};
	} catch (error) {
		if (error instanceof AppError) {
			return {
				success: false,
				message: error.message,
				errors: error.errors,
			};
		}

		console.error("[DELETE_Project_ERROR]:", error);

		return {
			success: false,
			message: "Terjadi kesalahan sistem",
		};
	}
}
