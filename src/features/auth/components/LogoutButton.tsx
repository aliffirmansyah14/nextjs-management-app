"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";

type LogoutButtonProps = ButtonProps;

export default function LogoutButton({
	className,
	children,
	variant = "default",
	...props
}: LogoutButtonProps) {
	return (
		<Button
			type="button"
			variant={variant}
			onClick={() =>
				authClient.signOut({
					fetchOptions: {
						onSuccess: () => {
							window.location.href = "/login";
						},
					},
				})
			}
			className={cn(className)}
			{...props}
		>
			{children}
		</Button>
	);
}
