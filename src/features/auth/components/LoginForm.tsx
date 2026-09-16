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
import { Button } from "@/components/ui/button";
import { signInAction } from "../actions/signin.action";
import LinkDirect from "./LinkDirect";
import GoogleOauthButton from "./GoogleOauthButton";

export const FORM_ID = "form-login";

export default function LoginForm() {
	const loginForm = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<LoginFormType> = async data => {
		// signIn better email
		const responseSignIn = await signInAction(data);

		if (responseSignIn.message) {
			loginForm.setError("root", {
				message: responseSignIn.message,
			});
		}
	};
	return (
		<form id={FORM_ID} onSubmit={loginForm.handleSubmit(onSubmit)}>
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
				{/* error dari betterauth */}
				{loginForm.formState.errors.root && (
					<div aria-invalid className="text-red-500">
						{loginForm.formState.errors.root.message}
					</div>
				)}
			</FieldGroup>
			{/* button login */}
			<div className="mt-4 space-y-4">
				<Button
					disabled={loginForm.formState.isSubmitting}
					size="lg"
					form={FORM_ID}
					type="submit"
					className="w-full disabled:bg-primary/80"
				>
					{loginForm.formState.isSubmitting ? "Loading... " : "Sign In"}
				</Button>
				{/* login with sosial link */}
				<ul
					data-title="Atau masuk dengan"
					className="w-full space-y-4 before:content-[attr(data-title)] before:block  before:text-muted-foreground before:text-center"
				>
					<li className="mt-6">
						<GoogleOauthButton />
					</li>
				</ul>
				{/* link direct */}
				<LinkDirect href="/signup" label="signup" text="Belum punya akun?" />
			</div>
		</form>
	);
}
