"use client";
import { Button } from "@/components/ui/button";
import { useMobileNav } from "@/features/dashboard/stores/use-mobile-nav";
import { Menu } from "lucide-react";

export default function ButtonTriggerMobileNav() {
	const openNav = useMobileNav(state => state.openNav);
	return (
		<Button
			onClick={openNav}
			type="button"
			variant="ghost"
			className={"rounded"}
			size="icon"
		>
			<Menu className="size-6" />
		</Button>
	);
}
