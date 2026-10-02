"use client";
import { useMobileNav } from "@/features/dashboard/stores/use-mobile-nav";
import SidebarContent from "./sidebar/sidebar-content";
import { cn } from "cn";

type MobilenNavProps = {
	children: React.ReactNode;
};

export default function MobilenNav({ children }: MobilenNavProps) {
	const isOpen = useMobileNav(state => state.isOpen);
	const closeNav = useMobileNav(state => state.closeNav);

	return (
		<div
			className={cn("fixed inset-0 h-dvh z-50 sm:hidden transition-opacity", {
				"pointer-events-none opacity-0": !isOpen,
				"pointer-events-auto opacity-100": isOpen,
			})}
		>
			{/* backdrop */}
			<div onClick={closeNav} className="absolute inset-0 bg-black/30" />

			{/* nav */}
			<aside
				className={cn(
					"h-full max-w-72 w-[90%] bg-background transition-transform duration-300",
					{
						"-translate-x-full": !isOpen,
						"translate-x-0": isOpen,
					},
				)}
			>
				<SidebarContent>{children}</SidebarContent>
			</aside>
		</div>
	);
}
