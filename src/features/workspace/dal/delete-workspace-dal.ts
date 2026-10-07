"use server";

import { AppError } from "@/lib/app-error";
import { requireSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function deleteWorkspaceDAL(id: string) {
	const { user } = await requireSession();

	// Jalankan hapus sekaligus verifikasi kepemilikan dalam 1 query atomic
	const result = await prisma.workspace.deleteMany({
		where: {
			id: id,
			ownerId: user.id,
		},
	});

	// Jika count === 0, berarti workspace tidak ada ATAU user bukan owner
	if (result.count === 0) {
		throw new AppError(
			"Workspace tidak ditemukan atau Anda tidak memiliki akses.",
		);
	}

	return result;
}
