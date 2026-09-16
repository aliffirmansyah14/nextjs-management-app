"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/shared/FormField";
import { signUpAction } from "@/features/auth/actions/signup.action";
import { Button } from "@/components/ui/button";
import LinkDirect from "./LinkDirect";
import {
	signUpFormSchema,
	SignUpFormType,
} from "@/features/auth/schemas/auth.schema";

export const FORM_ID = "form-register";

export default function SignUpForm() {
	const registerForm = useForm<SignUpFormType>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit: SubmitHandler<SignUpFormType> = async data => {
		// signup better auth
		const responseAuth = await signUpAction(data);

		if (responseAuth.message) {
			registerForm.setError("root", {
				message: responseAuth.message,
			});
			return;
		}

		registerForm.reset();
	};
	return (
		<form id={FORM_ID} onSubmit={registerForm.handleSubmit(onSubmit)}>
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
							autoComplete="additional-name"
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
					label="Confirm Password"
					renderInput={(field, invalid) => (
						<Input
							{...field}
							id={field.name}
							type="password"
							aria-invalid={invalid}
							placeholder="your password"
							autoComplete="match-password"
							className="h-10"
						/>
					)}
				/>
				{/* response error */}
				{registerForm.formState.errors.root && (
					<div aria-invalid className="text-red-500">
						{registerForm.formState.errors.root.message}
					</div>
				)}
			</FieldGroup>
			{/* button */}
			<div className="mt-4 space-y-4">
				<Button
					disabled={registerForm.formState.isSubmitting}
					size="lg"
					form={FORM_ID}
					type="submit"
					className="w-full disabled:bg-primary/70"
				>
					{registerForm.formState.isSubmitting ? "loading..." : "Sign Up"}
				</Button>
				{/* direct link ke login */}
				<LinkDirect href="/login" label="signin" text="Sudah punya akun?" />
			</div>
		</form>
	);
}
