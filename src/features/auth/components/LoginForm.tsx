"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	loginFormSchema,
	type LoginFormType,
} from "@/features/auth/schemas/auth.schema";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/shared/FormField";

export const FORM_ID = "form-login";

export default function LoginForm() {
	const loginForm = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const signInWithEmail: SubmitHandler<LoginFormType> = data => {
		// signIn better email
	};
	return (
		<form id={FORM_ID} onSubmit={loginForm.handleSubmit(signInWithEmail)}>
			<FieldGroup className="gap-2">
				<FormField
					control={loginForm.control}
					name="email"
					label="Email"
					renderInput={(field, invalid) => (
						<Input
							{...field}
							id={field.name}
							aria-invalid={invalid}
							placeholder="m@example.com"
							autoComplete="m@example.com"
							className="h-10"
						/>
					)}
				/>
				<FormField
					control={loginForm.control}
					name="password"
					label="Password"
					renderInput={(field, invalid) => (
						<Input
							{...field}
							id={field.name}
							aria-invalid={invalid}
							type="password"
							placeholder="your password"
							autoComplete="current-password"
							className="h-10"
						/>
					)}
				/>
			</FieldGroup>
		</form>
	);
}
