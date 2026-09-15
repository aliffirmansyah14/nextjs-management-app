"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	registerFormSchema,
	type RegisterFormType,
} from "@/features/auth/schemas/auth.schema";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/shared/FormField";

export const FORM_ID = "form-register";

export default function RegisterForm() {
	const registerForm = useForm<RegisterFormType>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const signUp: SubmitHandler<RegisterFormType> = data => {
		// signup better auth
	};
	return (
		<form id={FORM_ID} onSubmit={registerForm.handleSubmit(signUp)}>
			<FieldGroup className="gap-2">
				<FormField
					control={registerForm.control}
					name="name"
					label="Name"
					renderInput={(field, invalid) => (
						<Input
							{...field}
							id={field.name}
							aria-invalid={invalid}
							placeholder="budi "
							className="h-10"
						/>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="email"
					label="Email"
					renderInput={(field, invalid) => (
						<Input
							{...field}
							id={field.name}
							aria-invalid={invalid}
							placeholder="m@example.com"
							className="h-10"
							autoComplete="m@example.com"
						/>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="password"
					label="Password"
					renderInput={(field, invalid) => (
						<Input
							{...field}
							id={field.name}
							type="password"
							aria-invalid={invalid}
							placeholder="your password"
							autoComplete="current-password"
							className="h-10"
						/>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="confirmPassword"
					label="Confirmm Password"
					renderInput={(field, invalid) => (
						<Input
							{...field}
							id={field.name}
							aria-invalid={invalid}
							placeholder="your password"
							className="h-10"
						/>
					)}
				/>
			</FieldGroup>
		</form>
	);
}
