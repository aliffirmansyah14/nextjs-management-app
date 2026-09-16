import { APIError } from "better-auth";
import { auth } from "./auth";

type AuthErrorTypes = Partial<Record<keyof typeof auth.$ERROR_CODES, string>>;

const errorCodes = {
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
		"Email ini sudah terdaftar. Silakan gunakan email lain",
	INVALID_EMAIL_OR_PASSWORD: "Email atau password tidak valid",
} satisfies AuthErrorTypes;

// return string kosong kalo tidak ada di errorCodes
export const getErrorMessage = (error: unknown) => {
	if (error instanceof APIError) {
		const code = error.body?.code || "";

		if (code in errorCodes) {
			return errorCodes[code as keyof typeof errorCodes];
		}

		return error.body?.message || "";
	}
	return "";
};
