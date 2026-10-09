import { z } from "zod";

export const workspaceSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Nama workspace wajib diisi")
		.max(32, "Nama workspace maksimal 50 karakter"),
	description: z
		.string()
		.trim()
		.max(150, "Deskripsi workspace maksimal 50 karakter")
		.optional(),
});

export type WorkspaceFormType = z.infer<typeof workspaceSchema>;
