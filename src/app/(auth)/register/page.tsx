import { Button } from "@/components/ui/button";
import AuthCard from "@/features/auth/components/AuthCard";
import RegisterForm, { FORM_ID } from "@/features/auth/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
	return (
		<AuthCard
			title="Sign up to continue"
			content={<RegisterForm />}
			footer={
				<div className="space-y-4">
					<Button size="lg" form={FORM_ID} type="submit" className="w-full">
						Buat akun
					</Button>
					<div className="text-blue-600 text-center">
						Sudah punya akun ?{" "}
						<Link href="/login" className="underline">
							Sign in
						</Link>
					</div>
				</div>
			}
		/>
	);
}
