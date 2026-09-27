"use client";
import { useMobileNav } from "@/features/dashboard/stores/use-mobile-nav";
import SidebarContent from "./sidebar/sidebar-content";
import { cn } from "cn";

export default function MobilenNav({
	workspacesList,
}: {
	workspacesList: React.ReactNode;
}) {
	const isOpen = useMobileNav(state => state.isOpen);
	return (
		<div
			className={cn(
				"fixed inset-0 block sm:hidden h-dvh z-50 transition-all overflow-hidden",
				{
					"-translate-x-full opacity-0": !isOpen,
					"translate-x-0 opacity-100": isOpen,
				},
			)}
		>
			<div className="bg-background h-full">
				<SidebarContent>{workspacesList}</SidebarContent>
			</div>
		</div>
	);
}
