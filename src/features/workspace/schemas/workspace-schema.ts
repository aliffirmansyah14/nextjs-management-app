import { z } from "zod";

export const workspaceSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Nama workspace wajib diisi")
		.max(50, "Nama workspace maksimal 50 karakter"),
});

export type WorkspaceFormType = z.infer<typeof workspaceSchema>;
