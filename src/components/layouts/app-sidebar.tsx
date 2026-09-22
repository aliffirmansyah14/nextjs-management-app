"use client";

import Logo from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import {
	Folder,
	HomeIcon,
	LayoutDashboard,
	Logs,
	Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function AppSidebar({
	workspacesList,
}: {
	workspacesList: React.ReactNode;
}) {
	const currentPathname = usePathname();

	return (
		<aside className="sticky bg-background top-0 w-(--sidebar-width) h-dvh border-r border-border">
			<div className="flex flex-col px-4 pt-4 h-full">
				<div className="flex-1 flex flex-col gap-4 min-h-0 ">
					{/* logo */}
					<SidebarHeader />
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
					<div className="flex-1 overflow-hidden">{workspacesList}</div>
				</div>
				{/* setting link */}
				<div className="shrink-0 border-t border-border py-2">
					<SidebarItem
						as={Link}
						href="/settings"
						icon={<Settings className="size-6" />}
						title="Settings"
					/>
				</div>
			</div>
		</aside>
	);
}

type SidebarNavigasiProps<T> = {
	links: T[];
	render: (data: T, index: number) => React.ReactNode;
} & React.ComponentPropsWithoutRef<"ul">;

function SidebarNavigasi<T>({
	className,
	links,
	render,
	...props
}: SidebarNavigasiProps<T>) {
	return (
		<ul className={cn("grid gap-2")} {...props}>
			{links.map(render)}
		</ul>
	);
}

type SidebarItemProps<T extends React.ElementType> = {
	icon?: React.ReactNode;
	isActive?: boolean;
	as?: T;
	ariaCurrent?: string;
} & React.ComponentProps<T>;

export function SidebarItem<T extends React.ElementType = "div">({
	className,
	ariaCurrent,
	children,
	icon,
	isActive = false,
	as,
	...props
}: SidebarItemProps<T>) {
	// const Icon = icon;
	const Comp = as ?? "div";

	return (
		<Comp
			aria-current={isActive && as && as === Link ? "page" : undefined}
			className={cn(
				"flex items-center gap-4",
				"px-2.5 py-1.5",
				"rounded-lg",
				"font-medium tracking-tight ",
				className,
				{
					"text-muted-foreground hover:bg-muted": !isActive,
					"text-primary bg-primary/10": isActive,
				},
			)}
			{...props}
		>
			{icon}
			{children}
		</Comp>
	);
}

function SidebarHeader({
	className,
	children,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div className={className} {...props}>
			<Logo
				size="default"
				className="w-full justify-start gap-3 shrink-0"
				styleText="text-black/90"
			/>
			{children}
		</div>
	);
}
