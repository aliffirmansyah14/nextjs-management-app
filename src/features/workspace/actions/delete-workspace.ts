"use server";

import { ActionResponse } from "@/types/action";
import { AppError } from "@/lib/app-error";
import { deleteWorkspaceDAL } from "../dal/delete-workspace-dal";
import { revalidatePath } from "next/cache";

export async function deleteWorkspaceAction(
	id: string,
): Promise<ActionResponse> {
	try {
		await deleteWorkspaceDAL(id);

		// Revalidate data list workspace
		revalidatePath("/workspaces");

		return {
			success: true,
			message: "Workspace berhasil dihapus",
		};
	} catch (error) {
		if (error instanceof AppError) {
			return {
				success: false,
				message: error.message,
				errors: error.errors,
			};
		}

		console.error("[DELETE_WORKSPACE_ERROR]:", error);

		return {
			success: false,
			message: "Terjadi kesalahan sistem",
		};
	}
}
