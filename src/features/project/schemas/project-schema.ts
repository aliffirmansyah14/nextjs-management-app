import { z } from "zod";

export const projectSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Nama Project wajib diisi")
		.max(32, "Nama Project maksimal 32 karakter"),
	description: z
		.string()
		.trim()
		.max(150, "Deskripsi project maksimal 150 karakter")
		.optional(),
});

export type ProjectFormType = z.infer<typeof projectSchema>;
