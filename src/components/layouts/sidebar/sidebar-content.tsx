"use client";

import {
	Folder,
	HomeIcon,
	LayoutDashboard,
	Logs,
	Settings,
} from "lucide-react";
import SidebarHeader from "./sidebar-header";
import SidebarItem from "./sidebar-item";
import SidebarNavigasi from "./sidebar-navigasi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ButtonCloseMobileNav from "./button-close-moble-nav";

const SIDEBAR_ITEMS = [
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: HomeIcon,
	},
	{
		title: "Workspaces",
		href: "/workspaces",
		icon: LayoutDashboard,
	},
	{
		title: "Projects",
		href: "/projects",
		icon: Folder,
	},
	{
		title: "Tasks",
		href: "/task",
		icon: Logs,
	},
];

type SidebarContentProps = {
	children: React.ReactNode;
};

export default function SidebarContent({ children }: SidebarContentProps) {
	const currentPathname = usePathname();

	return (
		<div className="flex flex-col px-4 pt-4 h-full">
			<div className="flex-1 flex flex-col gap-4 min-h-0 ">
				{/* logo */}
				<SidebarHeader className="flex items-center justify-between px-2.5">
					<div className=" block md:hidden">
						<ButtonCloseMobileNav />
					</div>
				</SidebarHeader>
				{/* list dari route */}
				<SidebarNavigasi
					links={SIDEBAR_ITEMS}
					render={data => (
						<SidebarItem
							key={data.title}
							as={Link}
							href={data.href}
							isActive={data.href === currentPathname}
							icon={<data.icon className="size-6" />}
						>
							{data.title}
						</SidebarItem>
					)}
				/>

				{/* divider */}
				<div className="border-t border-border shrink-0" />
				{/* group list workspaces */}
				<div className="flex-1 overflow-hidden">{children}</div>
			</div>
			{/* setting link */}
			<div className="shrink-0 border-t border-border py-2">
				<SidebarItem
					as={Link}
					href="/settings"
					icon={<Settings className="size-6" />}
				>
					Settings
				</SidebarItem>
			</div>
		</div>
	);
}
