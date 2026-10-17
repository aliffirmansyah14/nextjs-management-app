"use server";
import { ActionResponse } from "@/types/action";
import { projectSchema } from "../schemas/project-schema";
import { AppError } from "@/lib/app-error";
import { createProjectDAL } from "../dal/create-project-dal";
import { revalidatePath } from "next/cache";

export async function createProjectAction(
	workspaceId: string,
	data: unknown,
): Promise<ActionResponse> {
	try {
		const parsed = projectSchema.safeParse(data);

		if (!parsed.success) {
			throw AppError.fromZod(parsed.error);
		}
		await createProjectDAL(workspaceId, parsed.data);

		revalidatePath(`/workspaces/${workspaceId}`);

		return {
			success: true,
			message: "Berhasil membuat project",
		};
	} catch (error) {
		if (error instanceof AppError) {
			return {
				success: false,
				message: error.message,
				errors: error.errors,
			};
		}
		console.error("[CREATE_Project_ERROR]:", error);

		return {
			success: false,
			message: "Terjadi kesalahan sistem",
		};
	}
}
