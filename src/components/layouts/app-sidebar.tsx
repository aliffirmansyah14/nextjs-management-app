import SidebarContent from "./sidebar/sidebar-content";

type AppSidebarProps = {
	children: React.ReactNode;
};

export default function AppSidebar({ children }: AppSidebarProps) {
	return (
		<aside className="sticky hidden sm:block bg-background top-0 w-(--sidebar-width) h-dvh border-r border-border">
			<SidebarContent>{children}</SidebarContent>
		</aside>
	);
}
