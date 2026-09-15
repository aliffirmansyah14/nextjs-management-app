import { Button } from "@/components/ui/button";
import AuthCard from "@/features/auth/components/AuthCard";
import LoginForm, { FORM_ID } from "@/features/auth/components/LoginForm";

import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
	return (
		<AuthCard
			title="Sign in to continue"
			content={<LoginForm />}
			footer={
				<>
					<Button size="lg" form={FORM_ID} type="submit" className="w-full">
						Sign Up
					</Button>
					{/* login with sosial link */}
					<ul
						data-title="Or continue with"
						className="w-full space-y-4 before:content-[attr(data-title)] before:block  before:text-muted-foreground before:text-center"
					>
						<li className="mt-6">
							<Button variant="outline" size="lg" className="w-full border-2">
								<Image
									width={24}
									height={24}
									src="/icons/google-logo.svg"
									alt="google icon "
								/>
								<span className="font-bold">Google</span>
							</Button>
						</li>
					</ul>
					<div className="text-blue-600 text-center">
						Belum punya akun ?.{" "}
						<Link href="/register" className="underline">
							sign up
						</Link>
					</div>
				</>
			}
		/>
	);
}
