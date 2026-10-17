"use server";
import { ActionResponse } from "@/types/action";
import { projectSchema } from "../schemas/project-schema";
import { AppError } from "@/lib/app-error";
import { revalidatePath } from "next/cache";
import { updateProjectDAL } from "../dal/update-project-dal";

export async function updateProjectAction(
	{ workspaceId, projectId }: { workspaceId: string; projectId: string },
	data: unknown,
): Promise<ActionResponse> {
	try {
		const parsed = projectSchema.safeParse(data);

		if (!parsed.success) {
			throw AppError.fromZod(parsed.error);
		}
		await updateProjectDAL({
			workspaceId,
			projectId,
			...parsed.data,
		});

		revalidatePath(`/workspaces/${workspaceId}`);

		return {
			success: true,
			message: "Berhasil merubah project",
		};
	} catch (error) {
		if (error instanceof AppError) {
			return {
				success: false,
				message: error.message,
				errors: error.errors,
			};
		}
		console.error("[UPDATEE_Project_ERROR]:", error);

		return {
			success: false,
			message: "Terjadi kesalahan sistem",
		};
	}
}
