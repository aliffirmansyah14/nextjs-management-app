"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GoogleOauthButton() {
	return (
		<Button variant="outline" size="lg" className="w-full border-2">
			<Image
				width={24}
				height={24}
				src="/icons/google-logo.svg"
				alt="google icon "
			/>
			<span className="font-bold">Google</span>
		</Button>
	);
}
