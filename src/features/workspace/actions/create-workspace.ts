"use server";

import { ActionResponse } from "@/types/action";
import { workspaceSchema } from "../schemas/workspace-schema";
import { revalidatePath } from "next/cache";
import { AppError } from "@/lib/app-error";
import { createWorkspaceDAL } from "../dal/create-workspace-dal";

export async function createWorkspaceAction(
	data: unknown,
): Promise<ActionResponse> {
	try {
		const parsed = workspaceSchema.safeParse(data);
		if (!parsed.success) {
			throw AppError.fromZod(parsed.error);
		}

		await createWorkspaceDAL(parsed.data.name);

		revalidatePath("/workspaces");

		return {
			success: true,
			message: "Workspace berhasil dibuat",
		};
	} catch (error) {
		if (error instanceof AppError) {
			return {
				success: false,
				message: error.message,
				errors: error.errors,
			};
		}
		console.error("[CREATE_WORKSPACE_ERROR]:", error);

		return {
			success: false,
			message: "Terjadi kesalahan sistem",
		};
	}
}
