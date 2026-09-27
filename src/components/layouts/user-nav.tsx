"use client";

import { authClient, useSession } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function UserNav() {
	const { data: session, isPending } = useSession();
	const [isLoading, setIsloading] = useState(false);

	if (isPending) {
		return (
			<div className="w-20 md:w-30 h-10 rounded-lg bg-muted animate-pulse" />
		);
	}

	const handleLogout = async () => {
		if (isLoading) return;

		setIsloading(true);

		await new Promise(resolve => setTimeout(resolve, 3000));
		setIsloading(false);

		// await authClient.signOut({
		// 	fetchOptions: {
		// 		onSuccess: () => {
		// 			router.push("/login");
		// 			router.refresh();
		// 			// reset state
		// 		},
		// 		onError: () => {
		// 			setIsloading(false);
		// 			isSubmitting.current = false;
		// 		},
		// 	},
		// });
	};

	if (session) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger
					className={cn(
						"flex justify-center gap-1 items-center",
						"px-1 py-1 md:pl-4 md:pr-3 md:py-2",
						"rounded-lg hover:bg-muted",
						"md:rotate-0 md:aria-expanded:bg-muted md:aria-expanded:[&_svg]:rotate-180",
					)}
				>
					{session.user.image ? (
						<div className="rounded-full border border-border md:border-0 overflow-hidden">
							<Image
								width={28}
								height={28}
								src={session.user.image}
								alt="avatar user"
								className="aspect-square size-7"
							/>
						</div>
					) : (
						<div className=" rounded-full size-7 bg-primary flex justify-center items-center text-white">
							{session.user.name[0].toLocaleUpperCase()}
						</div>
					)}

					<span className="hidden md:block">{session.user.name}</span>
					<ChevronDown className="hidden md:block ms-4 size-4 text-muted-foreground" />
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					<DropdownMenuGroup>
						<DropdownMenuLabel>My account</DropdownMenuLabel>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuSeparator />

						<DropdownMenuItem
							disabled={isLoading}
							aria-disabled={isLoading}
							variant="destructive"
							onSelect={e => {
								e.preventDefault();
							}}
							onPointerDown={e => {
								e.preventDefault();
								handleLogout();
							}}
						>
							{isLoading ? "Sedang keluar..." : "Logout"}
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}
}
