"use server";

import { ActionResponse } from "@/types/action";
import { workspaceSchema } from "../schemas/workspace-schema";
import { revalidatePath } from "next/cache";
import { AppError } from "@/lib/app-error";
import { updateWorkspaceDAL } from "../dal/update-workspace-dal";

export async function updateWorkspaceAction(
	id: string,
	data: unknown,
): Promise<ActionResponse> {
	try {
		if (!id) throw new AppError("ID workspace tidak ditemukan");

		const parsed = workspaceSchema.safeParse(data);
		if (!parsed.success) {
			throw AppError.fromZod(parsed.error);
		}

		await updateWorkspaceDAL(id, parsed.data.name);

		revalidatePath("/workspaces");
		revalidatePath(`/workspaces/${id}`);

		return {
			success: true,
			message: "Workspace berhasil diedit",
		};
	} catch (error) {
		if (error instanceof AppError) {
			return {
				success: false,
				message: error.message,
				...(error.errors && { errors: error.errors }),
			};
		}
		console.error("[UPDATE_WORKSPACE_ERROR]:", error);

		return {
			success: false,
			message: "Terjadi kesalahan sistem",
		};
	}
}
