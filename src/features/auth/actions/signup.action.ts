"use server";

import {
	signUpFormSchema,
	type SignUpFormType,
} from "@/features/auth/schemas/auth.schema";
import { auth } from "@/lib/auth/auth";
import { AuthResponse } from "../types/auth.type";
import { redirect } from "next/navigation";
import { APIError } from "better-auth";
import { getErrorMessage } from "@/lib/auth/error";

export const signUpAction = async (
	data: SignUpFormType,
): Promise<AuthResponse> => {
	// validasi input
	const isValidData = signUpFormSchema.safeParse(data);

	if (!isValidData.success) {
		return {
			message: "Periksa field signup form anda",
			errors: isValidData.error.flatten().fieldErrors,
		};
	}

	try {
		// create data ke db
		await auth.api.signUpEmail({
			body: { email: data.email, name: data.name, password: data.password },
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
	// refirect ke dashboard
	redirect("/dashboard");
};
