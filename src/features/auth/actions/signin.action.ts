"use server";

import { auth } from "@/lib/auth/auth";
import {
	loginFormSchema,
	LoginFormType,
} from "@/features/auth/schemas/auth.schema";
import { headers } from "next/headers";
import { AuthResponse } from "@/features/auth/types/auth.type";
import { redirect } from "next/navigation";
import { getErrorMessage } from "@/lib/auth/error";

export const signInAction = async (
	data: LoginFormType,
): Promise<AuthResponse> => {
	// validasi data
	const isValidData = loginFormSchema.safeParse(data);

	if (!isValidData.success) {
		return {
			message: "Periksa kembali field form anda",
			errors: isValidData.error.flatten().fieldErrors,
		};
	}

	try {
		// check apakah email dana password valid
		await auth.api.signInEmail({
			body: {
				email: data.email,
				password: data.password,
			},
			headers: await headers(),
		});
	} catch (error: unknown) {
		let errorMesssage = getErrorMessage(error);

		console.error(error);
		return {
			message:
				errorMesssage ||
				"Terjadi kesalahan sistem, silahkan coba beberapa saat lagi",
		};
	}

	redirect("/dashboard");
};
