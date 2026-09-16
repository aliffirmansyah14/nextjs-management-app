import * as z from "zod";

export const signUpFormSchema = z
	.object({
		name: z.string().min(3, "Nama minimal 3 karakter"),
		email: z.email().trim().toLowerCase(),
		password: z.string().min(8, "Password minimal 8 karakter"),
		confirmPassword: z.string().min(8, "Password minimal 8 karakter"),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Password tidak sama",
		path: ["confirmPassword"],
	});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export const loginFormSchema = z.object({
	email: z.email().trim().toLowerCase(),
	password: z.string().min(8, "Password minimal 8 karakter"),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
