import SidebarContent from "./sidebar/sidebar-content";

export default function AppSidebar({
	workspacesList,
}: {
	workspacesList: React.ReactNode;
}) {
	return (
		<aside className="sticky hidden sm:block bg-background top-0 w-(--sidebar-width) h-dvh border-r border-border">
			<SidebarContent>{workspacesList}</SidebarContent>
		</aside>
	);
}
