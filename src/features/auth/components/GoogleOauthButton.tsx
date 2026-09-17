"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth/social";
import Image from "next/image";
import { useState } from "react";

export default function GoogleOauthButton() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const handleOnClick = async () => {
		setErrorMessage("");
		setIsLoading(true);

		const { error } = await signInWithGoogle();

		if (error) {
			console.error(error);
			// set error
			setErrorMessage("Gagal melanjutkan dengan Google");
			setIsLoading(false);
		}
	};

	return (
		<div className="grid gap-2">
			<Button
				variant="outline"
				type="button"
				size="lg"
				className="w-full border-2 disabled:bg-background/80"
				onClick={handleOnClick}
				disabled={isLoading}
			>
				<Image
					width={24}
					height={24}
					src="/icons/google-logo.svg"
					alt="google icon "
				/>
				<span className="font-bold">
					{isLoading ? "Menghubungkan..." : "Google"}
				</span>
			</Button>

			{errorMessage && (
				<p role="alert" className="text-destructive font-medium">
					{errorMessage}
				</p>
			)}
		</div>
	);
}
